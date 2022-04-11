import { Box, Center, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard";
import ProtectedPage from "../../components/ProtectedPage";
import { axiosInstance } from "../../configs/api";
import requiresAuth from "../../lib/requiresAuth";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [page, setPage] = useState(1);

  const maxPostsPerPage = 5;

  const fetchPosts = async () => {
    console.log(page);
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          _limit: maxPostsPerPage,
          _page: page,
        },
      });

      setPosts((prevPosts) => [...prevPosts, ...res.data.result.rows]);
      // setMaxPosts(res.data.result.count);
    } catch (err) {
      console.log(err?.response?.data?.message || err.message);
    }
  };

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <ProtectedPage>
      <Box>
        <Center>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchNextPage}
            hasMore={true}
            loader={<Spinner />}
          >
            {/* <Stack spacing={4}> */}
            {posts?.map((postData) => {
              return <ContentCard {...postData} />;
            })}
            {/* </Stack> */}
          </InfiniteScroll>
        </Center>
      </Box>
    </ProtectedPage>
  );
};

export default PostsPage;

