import React,{useEffect, useState} from 'react';
import useStyles from './styles';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux';
import {createPost,updatePost} from '../../actions/posts';
import { TextField,Button,Typography,Paper } from '@material-ui/core';
import {useSelector} from 'react-redux';
//import { updatePost } from '../../../../server/controller/posts';
const Form=({currentId,setCurrentId})=>
{
     
    const [postData,setPostData]=useState({
        creator:'',title:'',message:'',tags:'',selectedFile:'',
    })
    const post =useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null); 

    useEffect(()=>{
        if(post)
        setPostData(post); 

    },[post]);
    //this means if the post value changes then only the callback function will run 

    const classes=useStyles();
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(currentId)
        {
            dispatch(updatePost(currentId,postData));
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear=()=>
    {
        setCurrentId(null);
        setPostData({creator:'',title:'',message:'',tags:'',selectedFile:'',});
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}> 
            <Typography variant ="h6">{currentId ? 'Editing' : 'Creating'} a memory</Typography>
            <TextField 
               name="creator"
               variant="outlined"
               label="Creator"
               fullWidth
               value={postData.creator}
               onChange={(e)=>setPostData({ ...postData,creator:e.target.value})}
            />
            <TextField 
               name="title"
               variant="outlined"
               label="Title"
               fullWidth
               value={postData.title}
               onChange={(e)=>setPostData({ ...postData,title:e.target.value})}
            />
            <TextField 
               name="message"
               variant="outlined"
               label="Message"
               fullWidth
               value={postData.message}
               onChange={(e)=>setPostData({ ...postData,message:e.target.value})}
            />
            <TextField 
               name="tags"
               variant="outlined"
               label="tags"
               fullWidth
               value={postData.tags}
               onChange={(e)=>setPostData({ ...postData,tags:e.target.value.split(',')})}
            />
            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                />
            </div>
            <Button className={classes.buttonSubmit} variant ="contained" color="primary" size="large" type="submit" fullWidth>SUBMIT</Button>
            <br/>
            <Button variant ="contained" color="secondary" size="small" onClick={clear} fullWidth>CLEAR</Button>
            </form>
        </Paper>
    )
}
export default Form;
