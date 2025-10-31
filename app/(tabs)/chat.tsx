import { View, StyleSheet, FlatList } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { MessageBubble } from '../../components/MessageBubble';
import { ChatInput } from '../../components/ChatInput';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [userMessage, ...prev]);
    setInput('');
    setIsLoading(true);

    try {
      abortControllerRef.current = new AbortController();
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: input }],
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${error}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
      };

      // Add the assistant message to the chat
      setMessages(prev => [assistantMessage, ...prev]);
      
      // Stream the response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = new TextDecoder().decode(value);
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = { ...newMessages[0] };
          
          // Only update if this is the assistant's message
          if (lastMessage.role === 'assistant') {
            lastMessage.content += text;
            newMessages[0] = lastMessage;
          }
          
          return newMessages;
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sending message:', error);
        // Show error message to user
        setMessages(prev => [
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: 'Sorry, there was an error processing your message.',
          },
          ...prev,
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [input]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            role={item.role}
            content={item.content}
            timestamp={new Date()}
          />
        )}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      <ChatInput
        value={input}
        onChangeText={setInput}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    padding: 16,
  },
});
