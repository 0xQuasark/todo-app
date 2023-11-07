import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthProvider";

function Auth({ capability, children }) {

  const { capabilities, isLoggedIn } = useContext(AuthContext);

  console.log('capabilities:', capabilities, 'isLoggedIn:', isLoggedIn, 'capability:', capability);

  return (
    <>
      {isLoggedIn && capabilities.includes(capability)
        ? {...children}
        : null
      }
    </>
  );
}

export default Auth;