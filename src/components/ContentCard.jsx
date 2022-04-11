import {
  Box,
  Image,
  Avatar,
  Text,
  Icon,
  Button,
  Input,
} from "@chakra-ui/react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";

const ContentCard = (props) => {
  const { username, location, caption, like_count, image_url, id, User } =
    props;

  return (
    <Box borderWidth="1px" borderRadius="lg" maxW="lg" paddingY="2" marginY="4">
      {/* Card Header */}
      <Box paddingX="3" paddingBottom="2" display="flex" alignItems="center">
        <Avatar src="https://bit.ly/dan-abramov" size="md" />
        <Box marginLeft="2">
          <Text fontSize="md" fontWeight="bold">
            {User?.username}
          </Text>
          <Text fontSize="sm" color="GrayText">
            {location}
          </Text>
        </Box>
      </Box>

      {/* Card Media/Content */}
      <Image src={image_url} />

      {/* Action Buttons */}
      <Box paddingX="3" paddingY="2" display="flex" alignItems="center">
        <Icon boxSize={6} as={FaRegHeart} />
        <Icon
          marginLeft="4"
          boxSize={6}
          as={FaRegComment}
          sx={{
            _hover: {
              cursor: "pointer",
            },
          }}
        />
      </Box>

      {/* Like Count */}
      <Box paddingX="3">
        <Text fontWeight="bold">{like_count?.toLocaleString()} likes</Text>
      </Box>

      {/* Caption */}
      <Box paddingX="3">
        <Text display="inline" fontWeight="bold" marginRight="2">
          {username}
        </Text>
        <Text display="inline">{caption}</Text>
      </Box>
    </Box>
  );
};

export default ContentCard;

