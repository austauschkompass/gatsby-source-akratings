/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => console.log("Loaded gatsby-source-organisations")

const RATING_SUMMARY_ORGANISATION_NODE_TYPE = 'RatingSummaryOrganisation'
const RATING_SUMMARY_CITY_NODE_TYPE = 'RatingSummaryCity'

exports.sourceNodes = async({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}, options) => {
  const { createNode } = actions

  let ratingSummariesOrganisations = require('./rating_summaries/organisations.json')
  let ratingSummariesCities = require('./rating_summaries/cities.json')

  ratingSummariesOrganisations.forEach((summary) => {
    console.log(`create ${RATING_SUMMARY_ORGANISATION_NODE_TYPE}: ${summary.organisation_slug}`)
    createNode({
      ...summary,
      id: createNodeId(`${RATING_SUMMARY_ORGANISATION_NODE_TYPE}-${summary.organisation_slug}`),
      parent: null,
      children: [],
      internal: {
        type: RATING_SUMMARY_ORGANISATION_NODE_TYPE,
        content: JSON.stringify(summary),
        contentDigest: createContentDigest(summary)
      }
    })
  })

  ratingSummariesCities.forEach((summary) => {
    console.log(`create ${RATING_SUMMARY_CITY_NODE_TYPE}: ${summary.country_name} ${summary.city_name}`)
    createNode({
      ...summary,
      id: createNodeId(`${RATING_SUMMARY_CITY_NODE_TYPE}-${summary.country_name}-${summary.city_name}`),
      parent: null,
      children: [],
      internal: {
        type: RATING_SUMMARY_CITY_NODE_TYPE,
        content: JSON.stringify(summary),
        contentDigest: createContentDigest(summary)
      }
    })
  })
}
