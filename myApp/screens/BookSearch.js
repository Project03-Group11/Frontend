import React, { useState, useEffect } from 'react';
import { Platform, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import styles from './BookSearchStyles';
import * as SecureStore from 'expo-secure-store';

const BookSearchPage = () => {
  let userId;

  if (Platform.OS === 'web') {
    userId = localStorage.getItem('userId');
  } else {
    userId = JSON.parse(SecureStore.getItem('userId'));
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title'); // Default search type
  const [results, setResults] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleSelectBook = (book) => {
    setSelectedBook(book); // Store the selected book details
    setIsModalVisible(true); // Show the success modal
    if(Platform.OS==='web'){
        localStorage.setItem("bookId",book.id);
    }else{
        SecureStore.setItem("bookId",JSON.stringify(book.id));
    }
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
        try {
          const response = await fetch('https://group11be-29e4f568939f.herokuapp.com/api/book/get-all');
          if (!response.ok) {
            throw new Error('Failed to fetch all books.');
          }
          const data = await response.json();

          const bookMapping = data.reduce((acc, book) => {
            acc[book.id] = {
              title: book.title,
              author: book.author,
              genre: book.genre || '',
              pages: book.pageCount,
              summary: book.summary || '',
              coverImage: book.coverImage || null, // Assuming there's a coverImage field
            };
            return acc;
          }, {});
          setAllBooks(bookMapping);
          setResults(Object.values(bookMapping).slice(0, 10));
        } catch (error) {
          Alert.alert('Error', error.message);
        }
    };

    fetchAllBooks();
  }, []);

  
  const handleSearchTitle = async (term) => {
    try {
      if (term.trim() === '') {
        setResults(Object.values(allBooks).slice(0, 10));
        return;
      }

      const results = Object.values(allBooks).filter((book) =>
        book.title.toLowerCase().includes(term.toLowerCase())
      );
      setResults(results);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSearchId = async (id) => {
    try {
        if (!id || !allBooks[id]) {
            setResults([]); // Clear results if the ID is not found
            return;
        }
        const results = allBooks[id];
        setResults([results]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSearchGenre = async (genre) => {
    try {
      if (genre.trim() === '') {
        setResults(Object.values(allBooks).slice(0, 10));
        return;
      }
      const results = Object.values(allBooks).filter((book) =>
        book.genre.toLowerCase().includes(genre.toLowerCase())
      );
      setResults(results);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSearch = () => {
    if (searchType === 'title') {
      handleSearchTitle(searchTerm);
    } else if (searchType === 'id') {
      handleSearchId(searchTerm);
    } else if (searchType === 'genre') {
      handleSearchGenre(searchTerm);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book Search</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search term"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setSearchType('title')} style={searchType === 'title' ? styles.activeFilter : styles.filter}>
          <Text style={styles.filterText}>Title</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSearchType('id')} style={searchType === 'id' ? styles.activeFilter : styles.filter}>
          <Text style={styles.filterText}>ID</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSearchType('genre')} style={searchType === 'genre' ? styles.activeFilter : styles.filter}>
          <Text style={styles.filterText}>Genre</Text>
        </TouchableOpacity>
      </View>


        <ScrollView style={styles.resultsContainer}>
            {results.length === 0 ? (
                <Text style={styles.noResults}>Sorry, no books matched your search.</Text>
            ) : (
                <View style={styles.bookListContainer}>
                    {results.map((book, index) => (
                    <View key={index} style={styles.bookCard}>
                        {book.coverImage && <Image source={{ uri: book.coverImage }} style={styles.coverImage} />}
                        <View style={styles.bookDetails}>
                            <Text style={styles.bookTitle}>{book.title}</Text>
                            <Text style={styles.bookAuthor}>Author: {book.author}</Text>
                            {/* Render summary only if it's not an empty string */}
                            {book.summary && book.summary.trim() !== '' && (
                                <Text style={styles.bookSummary}>Summary: {book.summary}</Text>
                            )}

                            <View style={styles.rowContainer}>
                                <>
                                    {book.genre && book.genre.trim() !== '' && (
                                    <Text style={styles.genreText}>Genre: {book.genre}</Text>
                                    )}<Text style={styles.pagesText}>Page Count: {book.pages}</Text>
                                </>
                            </View>


                            <TouchableOpacity style={styles.selectButton}
                            onPress={() => handleSelectBook(book)}>
                                <Text style={styles.selectButtonText}>Select</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    ))}
                </View>
            )}

             {/* Modal for Book Selection */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Book Selected!</Text>
                    {selectedBook && (
                    
                        <Text style={styles.modalMessage}>
                        You selected "{selectedBook.title}" by {selectedBook.author}.
                        </Text>
                   
                    )}
                    <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setIsModalVisible(false)}
                    >
                    <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </ScrollView>

    </View>
  );
};

export default BookSearchPage;