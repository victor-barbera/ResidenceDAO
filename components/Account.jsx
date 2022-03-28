import { useMoralis } from "react-moralis";
import { useState } from "react";


function Account() {
    const { authenticate,isAuthenticated, account, chainId, logout } =
      useMoralis();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
    const handleAuthenticateClick = () => authenticate({ signingMessage: "Login with you metamask wallet" })

  
      return (
        <>
          <button className="flex basis-1/3 items-center justify-end"  style={styles.text} onClick={handleAuthenticateClick}> 
          {!isAuthenticated ? 
          <div>
           Authenticate
          <img src={'./metamaskWallet.png'} alt={'Authenticate with Metamask'} style={{ alignSelf: "center",
            fill: "rgb(40, 13, 95)",
            flexShrink: "0",
            marginBottom: "8px",
            height: "30px",}} 
            /> 
          </div>
          : account}
        </button> 
 

        </>
      );
}
export default Account;