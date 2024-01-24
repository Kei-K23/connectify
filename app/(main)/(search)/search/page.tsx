import React from "react";
import SearchForm from "../_components/search-form";
import { getPostByNameAndProfileName } from "@/services/post-service";
import PostItem from "@/components/post/post-item";
import { PostWithAll } from "@/type";
import { getCurrentUser, getProfiles } from "@/services/user-service";
import SearchUserItem from "../_components/search-user-item";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    term: string;
  };
}) => {
  const posts = await getPostByNameAndProfileName(searchParams.term);
  const profile = await getCurrentUser();
  const profiles = await getProfiles();
  return (
    <div>
      <SearchForm />
      {searchParams.term ? (
        posts.length ? (
          <div className="space-y-8 mt-4 pb-14">
            {posts.map((post) => (
              <PostItem<PostWithAll>
                key={post.id}
                data={post}
                profile={profile!}
              />
            ))}
          </div>
        ) : (
          <h2 className="text-center text-muted-foreground mt-4">
            No results.
          </h2>
        )
      ) : profiles?.length === 0 ? (
        <h2 className="text-center text-muted-foreground mt-4">No results.</h2>
      ) : (
        <div className="mt-5 space-y-4">
          {profiles?.map((profile) => (
            <SearchUserItem key={profile.id} d={profile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
