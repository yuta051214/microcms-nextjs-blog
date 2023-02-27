import { client } from "../../libs/client";

export default function BlogId({ blog }) {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <p>{blog.category && blog.category.name}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
// ここではgetStaticPathsという関数を確認します。
// Next.js側ではブログのidを知り得ないため、事前に生成するべきHTMLのパスが分かりません。
// そこでこの関数内でデータを取得し、パスを定義してあげる必要があります。
// ここでのパスはmicroCMSのコンテンツIDです。
// またfallbackをfalseにしています。これで、getStaticPathsで返されないパスをすべて404ページで返します。
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
