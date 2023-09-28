import React, { useEffect } from 'react';
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/postAction';

function Posts() {
    const dispactch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const { posts, loading } = useSelector((state) => state.postReducer);

    useEffect(() => {
        dispactch(getTimelinePosts(user._id));
    }, []);

    return (
        <div className="Posts">
            {loading
                ? 'Fetching posts...'
                : posts.map((post, id) => {
                      return <Post data={post} id={id} />;
                  })}
        </div>
    );
}

export default Posts;
