import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 20 : 10,
    backgroundColor: '#f4e7d1',
  },
  navBar: {
    width: '100%',
    backgroundColor: '#a2755b',
    paddingVertical: 15,
    alignItems: 'center',
  },
  navBarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    alignItems: 'center',
  },
  postContainer: {
    width: '100%',
    minWidth: Platform.OS === 'web' ? 800 : 400,
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: '#ddd',
  },
  tag: {
    fontSize: 14,
    color: '#9c6644',
    fontWeight: '600',
    backgroundColor: '#C8E8FC',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,  // Space between user info and post content
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,  // Circular profile picture
    marginRight: 10,  // Space between profile picture and username
  },
  username: {
    fontWeight: '700',
    fontSize: 18,
    color: '#333',
  },
  content: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginTop: 6,
  },
  timestamp: {
    fontSize: 13,
    color: '#a1a1a1',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  likeIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  commentButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#555',
  },
  // Styles for the filter
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f4e7d1',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  filterLabel: {
    fontSize: 16,
    color: '#8b5e3c',
    fontWeight: '700',
    marginRight: 10,
  },
  picker: {
    height: 40,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default styles;