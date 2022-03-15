import { Box, Center, Text } from "@chakra-ui/react";
import ContentCard from "../../components/ContentCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Page from "../../components/Page";

const PostsPage = ({ postDetailData, webUrl }) => {
  return (
    <Page
      description={`${
        postDetailData.username
      } said, ${postDetailData?.caption?.slice(0, 15)}`}
      image={postDetailData.image_url}
      title={`${postDetailData.username} | ${postDetailData?.caption?.slice(
        0,
        15
      )}...`}
      url={webUrl}
    >
      <Box>
        <Center>
          <ContentCard
            location={postDetailData.location}
            caption={postDetailData.caption}
            imageUrl={postDetailData.image_url}
            numberOfLikes={postDetailData.number_of_likes || 0}
            username={postDetailData.username}
          />
        </Center>
      </Box>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const postId = context.params.id;

  const res = await axios.get("http://localhost:2000/posts/" + postId);

  return {
    props: {
      postDetailData: res.data,
      webUrl: "http://localhost:3000/posts/" + postId,
    },
  };
}

export default PostsPage;
