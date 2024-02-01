"use client"

import Article from '@/components/articles/Article'
import { getArticleData, getRandomArticle } from "@/api/articles";
import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react'

export default function ArticlePage({ params }) {
  const { state, setState } = useAppContext()
  const [mainArticleData, setMainArticleData] = useState(null);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchData()
  }, [])

  const mergeItemsFromMainArticle = () => {
    const copyArticle = JSON.parse(JSON.stringify(state.article));
    const concatedItems = copyArticle.Item.concat(mainArticleData.Item.splice(mainArticleData.Item.length, 3));
    copyArticle.Item = concatedItems;
    setMainArticleData(copyArticle);
    const copyArticlesArr = JSON.parse(JSON.stringify(articles));
    copyArticlesArr[0] = copyArticle;
    setArticles(copyArticlesArr);
  }

  const mergeItemsFromNewArticle = () => {

    const copyOriginalLastArticle = JSON.parse(JSON.stringify(state.originalLastArticle));
    const copyOriginalLastArticleItems = JSON.parse(JSON.stringify(copyOriginalLastArticle.Item));
    const copyArticlesArr = JSON.parse(JSON.stringify(articles));
    const lastArticle = copyArticlesArr[copyArticlesArr.length - 1];
    const concatedItems = lastArticle.Item.concat(copyOriginalLastArticleItems.splice(lastArticle.Item.length, 3));
    lastArticle.Item = concatedItems;
    copyArticlesArr[copyArticlesArr.length - 1] = lastArticle;
    setArticles(copyArticlesArr);
  }
  useEffect(() => {
    if (state.LastItemPosition && (state.LastItemPosition + 2) >= articles[articles.length - 1]?.Item.length) {

      if (mainArticleData?.Item.length < state.articleItemsLength) {

        mergeItemsFromMainArticle();
      } else if (state.originalLastArticle &&
        state.originalLastArticle.Item.length > articles[articles.length - 1].Item.length) {
        mergeItemsFromNewArticle();
      } else {
        fetchNewArticle();
      }
    }
  }, [state.LastItemPosition])

  const fetchData = async () => {
    const res = await getArticleData(params.slug);
    const articleAttributes = res?.attributes;
    const splicedArticle = JSON.parse(JSON.stringify(articleAttributes));
    const copiedArticleItems = JSON.parse(JSON.stringify(splicedArticle.Item));
    splicedArticle.Item = copiedArticleItems.splice(0, 3);
    setMainArticleData(splicedArticle);
    if (articles.length === 0) {
      setArticles(prevArticles => [splicedArticle]);
    }
    setState({ ...state, article: articleAttributes, articleItemsLength: articleAttributes.Item.length });
  }

  const fetchNewArticle = async () => {
    console.log(mainArticleData, 'mainArticleData')
    const category = mainArticleData?.category?.data?.attributes.slug;
    const res = await getRandomArticle(category);
    const articleAttributes = res?.attributes;
    const copiedArticle = JSON.parse(JSON.stringify(articleAttributes));
    let copiedArticleItems = JSON.parse(JSON.stringify(copiedArticle.Item));
    copiedArticleItems = copiedArticleItems.splice(0, 3);
    copiedArticle.Item = copiedArticleItems;
    setArticles(prevArticles => [...prevArticles, copiedArticle]);
    setState({ ...state, originalLastArticle: articleAttributes });
  }

  return (
    <>
      {articles.length && articles.map((article, index) => {
        let cumlativelyCount = [];
        articles.reduce((prevCount, article, index) => {
          cumlativelyCount.push(prevCount + article.Item.length);
          return prevCount + article.Item.length;
        }, 0);

        return <Article key={index}
          article={article}
          initialItemPosition={index === 0 ? 0 : cumlativelyCount[index - 1]} />
      })}
    </>
  )
}

export const dynamicParams = false
