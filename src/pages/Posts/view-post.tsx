import { PostDetails, ResponseImageSelect } from "@/components/Posts";

export default function ViewPostPage() {
  return (
    <div className="page-wrapper">
      <p className="text-lg text-subtle_text">View post</p>
      <ResponseImageSelect />
      <PostDetails />
    </div>
  );
}
