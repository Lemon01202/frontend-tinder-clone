import {useRecoilValue} from "recoil";
import {userState} from "../states/user-state";
import EditProfile from "../components/edit-profile/edit-profile";
import Layout from "../components/layout/layout";
const Profile = () => {
  const user = useRecoilValue(userState);

  return (
      <Layout>
        <EditProfile user={user} />
      </Layout>
  );
}

export default Profile;
