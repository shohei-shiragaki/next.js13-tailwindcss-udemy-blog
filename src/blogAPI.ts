import { noSSR } from "next/dynamic";
import { Article } from "./types";
import { SSG_FALLBACK_EXPORT_ERROR } from "next/dist/lib/constants";
import { notFound } from "next/navigation";

export const getAllArticles = async ():Promise<Article[]> => {
    /*第２引数
    {cache:"no-store"}⇒SSR
    {cache:"force-cache"}⇒SSG⇒第２引数がない場合のデフォルト値
    {next:{revalidate:10}}⇒SSR

    ⇒今回はSSR⇒ブログ投稿の更新頻度は高いため
    */
    const res = await fetch(`http://localhost:3001/posts`,{cache:"no-store"}); //SSR
    if (!res.ok){
        throw new Error("エラーが発生しました。")
    }

    await new Promise((resolve) => setTimeout(resolve,1500))
    const articles = await res.json();
    return articles;
}

export const getDetailArticle = async (id: string):Promise<Article> => {
    const res = await fetch(`http://localhost:3001/posts/${id}`,{
        next: { revalidate: 60 }
    }); //ISR
    if (res.status === 404){
        notFound()
        // throw new Error("エラーが発生しました。")
    }

    await new Promise((resolve) => setTimeout(resolve,1000))
    const articles = await res.json();
    return articles;
}

export const createArticle = async (id: string, title: string, content:string):Promise<Article> => {
    const currentDateTime = new Date().toISOString();
    const res = await fetch(`http://localhost:3001/posts`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id, title, content, createdAd: currentDateTime})
    });

    if (!res.ok){
        throw new Error("エラーが発生しました。")
    }

    await new Promise((resolve) => setTimeout(resolve,1500))
    const newArticle = await res.json();
    return newArticle;
}

export const deleteArticle = async (id: string):Promise<Article> => {
    const res = await fetch(`http://localhost:3001/posts/${id}`,{
        method: "POST",
    });

    if (!res.ok){
        throw new Error("エラーが発生しました。")
    }

    await new Promise((resolve) => setTimeout(resolve,1500))
    const deleteArticle = await res.json();
    return deleteArticle;
}