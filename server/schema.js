const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const Topic = require('./models/topics');
const Article = require('./models/articles');

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
            resolve: topic => topic._id
        },
        title: {
            type: GraphQLString,
            resolve: topic => topic.title
        },
        body: {
            type: GraphQLString,
            resolve: topic => topic.body
        },
        belongs_to: {
            type: GraphQLString,
            resolve: topic => topic.belongs_to
        },
        votes: {
            type: GraphQLInt,
            resolve: topic => topic.votes
        },
        created_by: {
            type: GraphQLString,
            resolve: topic => topic.created_by
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
            }
        })
    })
});