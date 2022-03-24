import { Box, Center, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard";
import ProtectedPage from "../../components/ProtectedPage";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../lib/requiresAuth";

const postData = {
  userId: 1,
  location: "BSD",
  imageUrl:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  numberOfLikes: 213424,
  caption:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolore enim praesentium inventore asperiores sunt corporis unde dicta ipsa dolorum voluptatibus dolor, odio nobis est consequuntur labore!",
  id: 1,
  username: "seto",
};

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts");

      setPosts(res.data.result);
    } catch (err) {
      console.log(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <ProtectedPage>
      <Box>
        <Center>
          <Stack spacing={4}>
            {posts.map((postData) => {
              return <ContentCard {...postData} />;
            })}
          </Stack>
        </Center>
      </Box>
    </ProtectedPage>
  );
};

export default PostsPage;
