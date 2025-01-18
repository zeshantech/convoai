"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import ChatMenu from "./ChatMenu";
import { Thread, ThreadList } from "@assistant-ui/react";
import { useGetChats } from "@/hooks/useGetChats";
import Link from "next/link";
import { useInfiniteScroll } from "react-scroll-trigger-hook";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { IChat } from "@/models/Chat";
import { Spinner } from "../ui/Spinner";

// Extend dayjs with necessary plugins
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormat);

interface GroupedChats {
  [group: string]: IChat[];
}

export const ChatList: React.FC = () => {
  const { data, isLoading, error, mutate } = useGetChats({});
  const [chats, setChats] = useState<IChat[]>([]);

  useEffect(() => {
    if (data) {
      setChats((pre) => pre.concat(data.docs));
    }
  }, [data]);

  const handleOnGroupChatsByDate = (chats: IChat[]): GroupedChats => {
    return chats.reduce<GroupedChats>((groups, chat) => {
      const chatDate = dayjs(chat.createdAt);
      let groupLabel = "";

      if (chatDate.isToday()) {
        groupLabel = "Today";
      } else if (chatDate.isYesterday()) {
        groupLabel = "Yesterday";
      } else if (chatDate.isSameOrAfter(dayjs().subtract(7, "day"), "day")) {
        groupLabel = "Last Week";
      } else if (chatDate.isSameOrAfter(dayjs().subtract(1, "month"), "day")) {
        groupLabel = "Last Month";
      } else {
        groupLabel = chatDate.format("YYYY");
      }

      if (!groups[groupLabel]) {
        groups[groupLabel] = [];
      }
      groups[groupLabel].push(chat);
      return groups;
    }, {});
  };

  const groupedChats = useMemo(() => handleOnGroupChatsByDate(chats), [chats]);

  const handleOnFetchNextPage = async () => {
    if (!data?.hasNextPage || !data.nextPage || isLoading) return;
    await mutate();
  };

  const { sentinelRef, isFetching } = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: data?.hasNextPage ?? false,
    onLoadMore: handleOnFetchNextPage,
    rootMargin: "0px 0px 200px 0px",
    threshold: 0.1,
  });

  if (isLoading && chats.length === 0) {
    return <Spinner />;
  }

  if (error) {
    return <span className="text-sm">Error loading chats.</span>;
  }

  return (
    <div id="sidebar-scrollable">
      {/* {Object.keys(groupedChats).map((group) => (
        <SidebarGroup key={group}>
          <SidebarGroupLabel className="sticky top-0 bg-sidebar z-10 rounded-none">{group}</SidebarGroupLabel>

          <SidebarMenu>
            {groupedChats[group].map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/chat/${item.id}`}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>

                <ChatMenu id={item.id} title={item.title} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))} */}

      {isLoading && <Spinner />}
    </div>
  );
};
