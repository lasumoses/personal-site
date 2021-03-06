import React from "react";
import "firebase/firestore";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preconnect"
      key="preconnect-js"
      href="https://cdn.jsdelivr.net"
    ></link>,
    <link
      rel="preconnect"
      key="preconnect-imagekit"
      href="https://ik.imagekit.io"
    ></link>,
    <link
      rel="preconnect"
      key="preconnect-icons8"
      href="https://maxst.icons8.com"
    ></link>,
    <link
      rel="preconnect"
      key="preconnect-fonts"
      href="https://fonts.googleapis.com"
    ></link>,
    <link
      rel="preconnect"
      key="preconnect-cloud"
      href="https://cdnjs.cloudflare.com"
    ></link>,
    <link
      rel="dns-prefetch"
      key="dns-prefetch-js"
      href="https://cdn.jsdelivr.net"
    ></link>,
    <link
      rel="dns-prefetch"
      key="dns-prefetch-imagekit"
      href="https://ik.imagekit.io"
    ></link>,
    <link
      rel="dns-prefetch"
      key="dns-prefetch-icons8"
      href="https://maxst.icons8.com"
    ></link>,
    <link
      rel="dns-prefetch"
      key="dns-prefetch-fonts"
      href="https://fonts.googleapis.com"
    ></link>,
    <link
      rel="dns-prefetch"
      key="dns-prefetch-cloud"
      href="https://cdnjs.cloudflare.com"
    ></link>,
  ]);
};
