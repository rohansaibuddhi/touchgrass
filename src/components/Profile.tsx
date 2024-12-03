export interface User {
  name: string;
  email: string;
}

export default function Profile(user: User) {
  return (
    <div className="w-full max-w-s justify-self-center mt-20 bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col">
      <h1>Hello {user.name}</h1>
      <span>Here are your details as pulled from Google:</span>
      <label>Email: {user.email}</label>
    </div>
  );
}
