import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ArticleCard({ article }) {
    return (
        <article className="article-card">

            <Link
                to={`/insights/articles/${article.category}/${article.id}`}
                className="article-card__image"
            >
                <img
                    src={article.image}
                    alt={article.title}
                />

                <div className="article-card__overlay" />

                <span className="article-card__read-time">
                    {article.readTime}
                </span>
            </Link>


            <div className="article-card__content">

                <span className="article-card__category">
                    ARTICLE
                </span>


                <Link
                    to={`/insights/articles/${article.category}/${article.id}`}
                    className="article-card__title"
                >
                    <h3>
                        {article.title}
                    </h3>
                </Link>


                <p>
                    {article.excerpt}
                </p>


                <Link
                    to={`/insights/articles/${article.category}/${article.id}`}
                    className="article-card__link"
                >
                    <span>
                        Read article
                    </span>

                    <ArrowRight size={17} />
                </Link>

            </div>

        </article>
    );
}

export default ArticleCard;