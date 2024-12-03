import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf3e9', // soft coffee background
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3e2a1c', // deep coffee color
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#e0d4c8',
        color: '#3e2a1c',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchButton: {
        backgroundColor: '#d4b59e',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    bookItem: {
        flexDirection: 'row',
        backgroundColor: '#fff8f0', // lighter coffee
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    bookImage: {
        width: 60,
        height: 90,
        borderRadius: 5,
        marginRight: 15,
    },
    bookDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3e2a1c',
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#3e2a1c',
        marginBottom: 3,
    },
    bookGenre: {
        fontSize: 14,
        color: '#3e2a1c',
    },
});

export default styles;
