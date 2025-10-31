import { generateAPIUrl } from "../../src/utils/utils";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIDataTypes, UIMessage, UITools } from "ai";
import { fetch as expoFetch } from "expo/fetch";
import React, { useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function ChatScreen() {
	const [input, setInput] = useState("");

	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			fetch: expoFetch as unknown as typeof globalThis.fetch,
			api: generateAPIUrl("/api/chat"),
		}),
	});

	const isLoading = status === "streaming";

	const handleSend = async () => {
		if (input.trim() === "") return;
		const inputText = input;
		setInput("");
		await sendMessage({ text: inputText });
	};

	const renderItem = ({
		item,
	}: {
		item: UIMessage<unknown, UIDataTypes, UITools>;
	}) => {
		return (
			<View
				style={[
					styles.messageContainer,
					item.role === "user" ? styles.user : styles.ai,
				]}
			>
				{item.parts.map((part, i) => {
					switch (part.type) {
						case "text":
							return (
								<Text key={`${item.id}-${i}`} style={styles.messageText}>
									{part.text}
								</Text>
							);
					}
				})}
			</View>
		);
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<FlatList
				data={[...messages]}
				keyExtractor={(_, idx) => idx.toString()}
				renderItem={renderItem}
				contentContainerStyle={styles.list}
			/>
			{isLoading && (
				<View style={styles.loading}>
					<ActivityIndicator size="small" color="#007AFF" />
					<Text style={styles.loadingText}>AI is typing...</Text>
				</View>
			)}
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={input}
					onChangeText={setInput}
					placeholder="Type your message..."
					onSubmitEditing={handleSend}
					editable={!isLoading}
				/>
				<TouchableOpacity
					onPress={handleSend}
					disabled={isLoading || input.trim() === ""}
					style={{
						width: 50,
						alignItems: "center",
						borderWidth: 1,
						padding: 8,
						backgroundColor:
							isLoading || input.trim() === "" ? "#ccc" : "#007AFF",
						borderColor: isLoading || input.trim() === "" ? "#ccc" : "#007AFF",
					}}
				>
					<Text
						style={{
							color: isLoading || input.trim() === "" ? "#grey" : "#fff",
						}}
					>
						Send
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	list: { flexGrow: 1, justifyContent: "flex-end", padding: 16 },
	messageContainer: {
		marginVertical: 4,
		padding: 10,
		borderRadius: 8,
		maxWidth: "80%",
	},
	user: { alignSelf: "flex-end", backgroundColor: "#DCF8C6" },
	ai: { alignSelf: "flex-start", backgroundColor: "#F1F0F0" },
	messageText: { fontSize: 16 },
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		borderTopWidth: 1,
		borderColor: "#eee",
		backgroundColor: "#fafafa",
	},
	input: {
		flex: 1,
		fontSize: 16,
		padding: 8,
		backgroundColor: "#fff",
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#ddd",
		marginRight: 8,
	},
	loading: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		justifyContent: "center",
	},
	loadingText: { marginLeft: 8, color: "#888" },
});
