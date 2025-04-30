package ru.remsely.psyhosom.db.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.OneToOne
import jakarta.persistence.Table
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import ru.remsely.psyhosom.domain.psychologist.Article as DomainArticle

@Entity
@Table(name = "psychologist_profile")
data class Psychologist(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @JoinColumn(nullable = false, unique = true)
    @OneToOne
    val account: Account,

    @Column(name = "first_name", nullable = false)
    val firstName: String,

    @Column(name = "last_name", nullable = false)
    val lastName: String,

    @Column(name = "profile_image_url", nullable = false)
    val profileImageUrl: String,

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    val article: Article
) {
    @JvmInline
    value class Article(
        val values: List<ArticleBlock>
    ) {
        data class ArticleBlock(
            val type: DomainArticle.ArticleBlock.Type,
            val content: String
        )
    }
}
