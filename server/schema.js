const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const Topic = require('./models/topics');
const Article = require('./models/articles');
const Comment = require('./models/comments');

const TopicType = new GraphQLObjectType({
    name: 'Topic',
    description: '...',
    fields: () => ({
        _id: {
            type: GraphQLString,
            resolve: topic => topic._id
        },
        slug: {
            type: GraphQLString,
            resolve: topic => topic.slug
        },
        title: {
            type: GraphQLString,
            resolve: topic => topic.title
        }
    })
});

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    description: '...',
    fields: () => ({
        _id: {
            type: GraphQLString,
            resolve: article => article._id
        },
        title: {
            type: GraphQLString,
            resolve: article => article.title
        },
        body: {
            type: GraphQLString,
            resolve: article => article.body
        },
        belongs_to: {
            type: GraphQLString,
            resolve: article => article.belongs_to
        },
        votes: {
            type: GraphQLInt,
            resolve: article => article.votes
        },
        created_by: {
            type: GraphQLString,
            resolve: article => article.created_by
        },
        commentCount: {
            type: GraphQLInt,
            resolve: article => Comment.find({belongs_to: article._id}).count()
        }
    })
});

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            allTopics: {
                type: new GraphQLList(TopicType),
                resolve: () => Topic.find()
            },
            allArticles: {
                type: new GraphQLList(ArticleType),
                resolve: () => Article.find()
            },
            articlesByTopic: {
                type: new GraphQLList(ArticleType),
                args: {
                    topicName: {type: GraphQLString}
                },
                resolve: (root, args) => 
                    Article.find({belongs_to: args.topicName})
            },
            articleById: {
                type: ArticleType,
                args: {
                    id: {type: GraphQLString}
                },
                resolve: (root, args) => 
                    Article.findById(args.id)
            }
        })
    })
});