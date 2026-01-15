// client/src/pages/FriendsPage.jsx
import { useQuery } from "@tanstack/react-query";
import { getMyFriends } from "../lib/api";
import { Users, Search } from "lucide-react";
import NoFriendsFound from "../components/NoFriendsFound"; // Đã có trong file list
import FriendCard from "../components/FriendCard"; // Nếu bạn đã code FriendCard, hãy uncomment
import { useState } from "react";

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: friendsData, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getMyFriends,
  });

  const friends = friendsData?.friends || [];

  // Logic lọc bạn bè theo tên
  const filteredFriends = friends.filter((friend) =>
    friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Connections</h1>
                <p className="text-base-content/60">
                  You have {friends.length} friends
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Search friends..."
                className="input input-bordered w-full pl-10 focus:input-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredFriends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.map((friend) => (
              /* Nếu bạn đã có component FriendCard thì dùng nó ở đây, ví dụ: 
                 <FriendCard key={friend._id} friend={friend} /> 
                 Dưới đây là code hiển thị trực tiếp nếu chưa dùng Component: */
              <div
                key={friend._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
              >
                <div className="card-body flex flex-row items-center gap-4 p-4">
                  <div className="avatar online">
                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={friend.profilePic || "/avatar.png"}
                        alt={friend.fullName}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">
                      {friend.fullName}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="badge badge-ghost badge-sm text-xs">
                        Native: {friend.nativeLanguage}
                      </span>
                      <span className="badge badge-primary badge-outline badge-sm text-xs">
                        Learning: {friend.learningLanguage}
                      </span>
                    </div>
                  </div>
                  {/* Action Buttons (Ví dụ: Chat, Call) */}
                  {/* <button className="btn btn-circle btn-ghost btn-sm">
                    <MessageSquare className="w-4 h-4" />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10">
             {/* Sử dụng component NoFriendsFound có sẵn trong file list */}
            <NoFriendsFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;