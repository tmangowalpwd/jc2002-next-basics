

const ProtectedPage = ({ children }) => {
  return children
}

export async function getServerSideProps(context) {
  const savedUserData = localStorage.getItem("user_data")

  if (true) {
    return {
      // redirect: {
      //   destination: "/",
      //   permanent: true
      // }
      notFound: true
    }
  }

  return {
    props: {}
  };
}

export default ProtectedPage;