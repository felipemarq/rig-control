import { UserLogsContext, UserLogsProvider } from "./components/UserLogsContext";

const UserLogs = () => {
  return (
    <UserLogsProvider>
      <UserLogsContext.Consumer>
        {({ userId }) => <div>{userId}</div>}
      </UserLogsContext.Consumer>
    </UserLogsProvider>
  );
};
export default UserLogs;
