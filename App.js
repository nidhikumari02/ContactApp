import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-popup-dialog';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // Fetch contacts from the phone or use a dummy list
    const dummyContacts = [
      { name: 'Arjun', number: '1234567890' },
      { name: 'Arjun Sharma', number: '9876543210' },
      { name: 'John Doe', number: '5555555555' },
      // Add more contacts as needed
    ];

    setContacts(dummyContacts);
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
  };

  const renderContact = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleContactPress(item)}>
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <Text>{item.name}</Text>
          <Text>{item.number}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <TextInput
        style={{ paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
        placeholder="Search contacts"
        onChangeText={handleSearch}
      />

      <FlatList
        data={contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))}
        renderItem={renderContact}
        keyExtractor={(item) => item.number}
      />

      <Dialog.Container visible={selectedContact !== null}>
        <Dialog.Title>Contact Details</Dialog.Title>
        {selectedContact && (
          <View>
            <Text>Name: {selectedContact.name}</Text>
            <Text>Number: {selectedContact.number}</Text>
          </View>
        )}
        <Dialog.Button label="Dismiss" onPress={() => setSelectedContact(null)} />
      </Dialog.Container>
    </View>
  );
};

export default App;
