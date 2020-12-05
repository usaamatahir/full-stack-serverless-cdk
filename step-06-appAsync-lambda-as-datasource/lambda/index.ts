import Post from "./Post";

type APPSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    post: Post;
    postId: string;
  };
};

exports.handler = async (event: APPSyncEvent) => {
  switch (event.info.fieldName) {
    case "records":
      return `All records`;
    case "getRecordById":
      return `Records with ID: ${event.arguments.postId}`;
    default:
      return null;
  }
};
