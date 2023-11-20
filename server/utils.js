module.exports = {
  makeMWareBanner: (controller) => {
    return (method) => console.log(`~~~~~~~~~${controller}.${method}~~~~~~~~`);
  },
};
