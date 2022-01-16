import React from "react";

interface Props {}

const UnreachableNewPage = (props: Props) => {
  return (
    <div>
      If you are able to reach this page through your browser either you are a
      hacker or Next.js changed their routing API
    </div>
  );
};

export default UnreachableNewPage;
