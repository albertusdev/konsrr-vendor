import React from "react";

export default function FirebaseStorageImg({ src, ...props }) {
  const imgEl = React.useRef();
  React.useEffect(
    () => {
      src
        .getDownloadURL()
        .then((url) => imgEl.current && (imgEl.current.src = url));
    },
    /* eslint-disable */ [src.fullPath]
  );

  return <img ref={imgEl} {...props}></img>;
}
