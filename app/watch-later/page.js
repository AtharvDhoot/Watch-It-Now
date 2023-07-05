"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import Loading from "@/components/Loading";
import CollectionSearch from "@/components/CollectionSearch";
import Link from "next/link";

import { SignOut } from "@/firebase/auth/SignOut";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTitles } from "@/firebase/firestore/GetTitles";
import { useState } from "react";
import useAuth from "@/firebase/hooks/useAuth";

export default function WatchLater() {
  const { user, isLoading } = useAuth();
  let url = null;
  if (!user) {
    const movieIds = encodeURIComponent(
      localStorage.getItem("watch-later-movies")
    );
    const tvIds = encodeURIComponent(localStorage.getItem("watch-later-tv"));
    url = `/api/watch-later?movieIds=${movieIds}&tvIds=${tvIds}`;
  }
  const { data: datalocal, error } = useSWR(!user ? url : null, fetcher);

  let urldb = null;
  const [dbSearch, setDbSearch] = useState(false);
  const [dbUrl, setDbUrl] = useState("");
  if (user) {
    getTitles(user.uid).then((res) => {
      const movieIdsdb = encodeURIComponent(JSON.stringify(res.movieIds));
      const tvIdsdb = encodeURIComponent(JSON.stringify(res.tvIds));
      urldb = `/api/watch-later?movieIds=${movieIdsdb}&tvIds=${tvIdsdb}`;
      setDbUrl(urldb);
      setDbSearch(true);
    });
  }
  const { data: datadb, error: errordb } = useSWR(
    dbSearch ? dbUrl : null,
    fetcher
  );

  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        await SignOut();
        toast.success("Sign out successfull", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } catch (e) {
        toast.error("Sign out not successfull, Try again", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="bg-base-100">
          <div className="container mx-auto min-h-screen ">
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              theme={
                localStorage.getItem("theme") === "night" ? "dark" : "light"
              }
              limit={1}
            />
            {user ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-medium tracking-wider ml-1.5 mb-2">
                    Bookmarked Movies
                  </div>
                  <button className="btn btn-primary" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
                {datadb ? (
                  datadb.movieResults.length > 0 ? (
                    <CollectionSearch
                      arr={datadb.movieResults}
                      media_type="movie"
                    />
                  ) : (
                    <div className="font-medium tracking-wider ml-1.5 mb-6">
                      Add movies by clicking on the plus icon!
                    </div>
                  )
                ) : (
                  <Loading />
                )}
                <div className="text-2xl font-medium tracking-wider ml-1.5 mb-2">
                  Bookmarked TV Series
                </div>
                {datadb ? (
                  datadb.tvResults.length > 0 ? (
                    <CollectionSearch arr={datadb.tvResults} media_type="tv" />
                  ) : (
                    <div className="font-medium tracking-wider ml-1.5 mb-6">
                      Add TV series by clicking on the plus icon!
                    </div>
                  )
                ) : (
                  <Loading />
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4 mx-4 md:mx-0">
                  <div className="text-xl">
                    Want to sync your data with other devices? Sign Up!
                  </div>
                  <div className="grid md:flex gap-4">
                    <Link className="btn btn-primary" href={"/signup"}>
                      Sign Up
                    </Link>
                    <Link className="btn btn-primary" href={"/signin"}>
                      Login
                    </Link>
                  </div>
                </div>
                <div className="text-2xl font-medium tracking-wider ml-1.5 mb-2">
                  Bookmarked Movies
                </div>
                {datalocal ? (
                  datalocal.movieResults.length > 0 ? (
                    <CollectionSearch
                      arr={datalocal.movieResults}
                      media_type="movie"
                    />
                  ) : (
                    <div className="font-medium tracking-wider ml-1.5 mb-6">
                      Add movies by clicking on the plus icon!
                    </div>
                  )
                ) : (
                  <Loading />
                )}
                <div className="text-2xl font-medium tracking-wider ml-1.5 mb-2">
                  Bookmarked TV Series
                </div>
                {datalocal ? (
                  datalocal.tvResults.length > 0 ? (
                    <CollectionSearch
                      arr={datalocal.tvResults}
                      media_type="tv"
                    />
                  ) : (
                    <div className="font-medium tracking-wider ml-1.5 mb-6">
                      Add TV series by clicking on the plus icon!
                    </div>
                  )
                ) : (
                  <Loading />
                )}
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
}
