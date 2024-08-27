import { query } from "./_generated/server";

export const getAll = query({
    args: {},
    handler: async (ctx, {}) => {
        const articles = await ctx.db.query("articles").collect();

        for (const article of articles) {
           const imageUrl = await ctx.storage.getUrl(article.imageId);
           if (imageUrl) {
                article.imageUrl = imageUrl
           }
        }

        return articles;
    }
})