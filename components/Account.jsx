import { useMoralis } from "react-moralis";
const styles = {
    account: {
      height: "42px",
      padding: "0 15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "fit-content",
      borderRadius: "12px",
      backgroundColor: "rgb(244, 244, 244)",
      cursor: "pointer",
    },
    text: {
      color: "#21BF96",
    },
    connector: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      height: "auto",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "20px 5px",
      cursor: "pointer",
    },
    icon: {
      alignSelf: "center",
      fill: "rgb(40, 13, 95)",
      flexShrink: "0",
      marginBottom: "8px",
      height: "30px",
    },
  };
function Account() {
    const { authenticate,isAuthenticated, account, chainId, logout } =
      useMoralis();
    const handleAuthenticateClick = () => authenticate({ signingMessage: "Login with you metamask wallet" })
    const handleLogoutClick = ()=> logout();

    if(!isAuthenticated){
        return (
            <>
              <button className="flex basis-1/3 items-center justify-end"  style={styles.text} onClick={handleAuthenticateClick}> 
              <div>
               Authenticate
              <img src={'./metamaskWallet.png'} alt={'Authenticate with Metamask'} style={styles.icon} 
                /> 
              </div>
            </button> 
            </>
          );
    }else{
        return(
            <>
            <div  style={styles.text}>
              <p>{account}
                  </p>
              <button className="flex basis-1/3 items-center justify-end" style={styles.text}  onClick={handleLogoutClick}>
                  LogOut
              </button>
        </div>
            </>
        )
    }

}
export default Account;