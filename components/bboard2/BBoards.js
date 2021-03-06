import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Axios from 'axios';

import {useValue} from '../ValueContext';

const flagPost = item => {
  return 0;
};

const BBoards = () => {
  const {currentValue} = useValue();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [bboard, setBboard] = useState('');
  const [posts, setPosts] = useState([]);
  const [numNewPosts, setNumNewPosts] = useState(0);

  useEffect(() => {
    // go out to the server and get the posts for the current bboard

    const getPosts = async () => {
      let result = {data: []};
      result = await Axios.post(currentValue.appURL + '/posts', {
        bboard: bboard,
      });
      setPosts(result.data);
      return result.data;
    };

    const ps = getPosts();
  }, [bboard, numNewPosts]);

  const addPost = async () => {
    await Axios.post(currentValue.appURL + '/addComment', {
      email: currentValue.email,
      secret: currentValue.secret,
      bboard: bboard,
      title: title,
      text: text,
    });
    setTitle('');
    setText('');

    setNumNewPosts(numNewPosts + 1);
  };

  const remove = async item => {
    console.log('remove is called on item: ');
    console.log(item);
    const result = await Axios.post(currentValue.appURL + '/deletePost', {
      email: currentValue.email,
      secret: currentValue.secret,
      postid: item._id,
    });
    console.log(result);
    setNumNewPosts(numNewPosts + 1);
  };

  const Item = ({item}) => {
    const userid = currentValue.userid;
    const isAuthor = userid === item.author;

    return (
      <View style={{padding: 10, margin: 10, backgroundColor: '#ddd'}}>
        <Text style={{fontSize: 24}}>{item.title}</Text>
        <Text>{item.text}</Text>
        <Text>{item.createdAt}</Text>

        {isAuthor && <Button title="Delete" onPress={() => remove(item)} />}

        <Button title="Flag" onPress={() => flagPost(item)} />
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.input}>
        <Text style={{marginRight: 10}}>Game</Text>
        <TextInput
          onChangeText={text => setBboard(text)}
          placeholder="input game name here"
        />
      </View>

      <View style={styles.input}>
        <Text> Find your teammate here.</Text>
        <Text> You've added {numNewPosts} postes!</Text>
        <TextInput
          onChangeText={text => setTitle(text)}
          value={title}
          placeholder="Enter title here"
        />
        <TextInput
          onChangeText={text => setText(text)}
          value={text}
          placeholder="Requirements(e.g.How many/what roles/time)"
        />
        <TouchableOpacity
          onPress={() => addPost()}
          style={{width: 46, backgroundColor: '#FDB9FC'}}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.posts}>
        <Text>total posts: {'' + posts.length}</Text>
        <FlatList
          style={{flex: 1}}
          data={posts}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item._id}
        />

        {/* <Text>end of flatlist {JSON.stringify(posts,null,5)} </Text> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#396EB0',
    borderWidth: 5,
    borderRadius: 20,
    backgroundColor: '#FFEF78',
    padding: 5,
    margin: 5,
  },
  posts: {
    borderColor: '#EB92BE',
    borderWidth: 5,
    borderRadius: 20,
    backgroundColor: '#FFEF78',
    padding: 5,
    margin: 5,
  },
});

export default BBoards;
