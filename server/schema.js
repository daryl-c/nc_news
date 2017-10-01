const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} = require('graphql');

const Topic = require('./models/topics');

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

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            topics: {
                type: new GraphQLList(TopicType),
                resolve: () => Topic.find()
            }
        })
    })
});