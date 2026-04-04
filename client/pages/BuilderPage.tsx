import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/react";
import { useEffect, useState } from "react";

export default function BuilderPage() {
  const [content, setContent] = useState(null);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    builder
      .get("page", {
        url: window.location.pathname,
      })
      .then(setContent);
  }, []);

  if (!content && !isPreviewing) return null;

  return <BuilderComponent model="page" content={content} />;
}
