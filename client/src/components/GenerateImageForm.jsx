import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './button';
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { GenerateImage } from "../api/index"

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: #9747FF;
`;
const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

export const GenerateImageForm = ({
    post,
    setPost,
    createPostLoading,
    setCreatePostLoading,
    generateImageLoading,
    setGenerateImageLoading
}) => {
    const [error, setError] = useState("");
    const generateImageFun = async () => {
        setGenerateImageLoading(true);
        await GenerateImage({ prompt: post.prompt }).then((res) => {
            // console.log(res);
            if (res?.data?.photo) {
                setPost({
                    ...post,
                    photo: `data:image/webp;base64,${res?.data?.photo}`,  // Changed to webp if that's the image type
                });
            } else {
                setError("No image generated or photo data is missing");
            }
            setGenerateImageLoading(false);
        }).catch((error) => {
            setError(error?.response?.data?.message);
            setGenerateImageLoading(false);
        })
    }
    const createPostfun = () => {
        setCreatePostLoading(true);
    }
    return (
        <Form>
            <Top>
                <Title>Generate Image with prompt</Title>
                <Desc>Write your prompt according to the image you want to generate.</Desc>
            </Top>
            <Body>
                <TextInput label="Author" placeholder="Enter your name.." name="name" value={post.name} handelChange={(e) => setPost({ ...post, name: e.target.value })} />
                <TextInput label="Image prompt" placeholder="Write a detailed prompt about the image you want to generate..." name="Image" rows="8" textArea value={post.prompt} handelChange={(e) => setPost({ ...post, prompt: e.target.value })} />
                {error && <div style={{ color: "red" }}>{error}</div>}
                ** You can post the AI Generated Image to the community **
            </Body>
            <Actions>
                <Button
                    text="Generate Image"
                    flex
                    leftIcon={<AutoAwesome />}
                    isLoading={generateImageLoading}
                    isDisabled={post.prompt === ""}
                    onClick={() => generateImageFun()}
                />
                <Button
                    type="secondary"
                    text="Post Image"
                    flex
                    leftIcon={<CreateRounded />}
                    isLoading={createPostLoading}
                    isDisabled={post.name === "" || post.prompt === "" || post.photo === ""}
                    onClick={() => createPostfun()}
                />
            </Actions>
        </Form>
    )
}
