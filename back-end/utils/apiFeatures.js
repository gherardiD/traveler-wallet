class APIFeature {
  constructor(query, reqQuery) {
    // query: mongoose query object
    this.query = query;
    // reqQuery: req.query (object)
    this.reqQuery = reqQuery;
  }

  filter() {
    const queryObj = { ...this.reqQuery };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    // regular expression to add $ sign before gte, gt, lte, lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // example of queryStr:
    // {"difficulty":"easy","duration":{"$gte":"5"},"price":{"$lt":"1500"}}

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.reqQuery.fields) {
      const fields = this.reqQuery.fields.split(",").join(" ");
      this.query = this.query.select(fields);
      // select('name duration price')
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    // page=2&limit=10 -> 1-10 page 1, 11-20 page 2, 21-30 page 3
    const page = this.reqQuery.page * 1 || 1; // default 1
    const limit = this.reqQuery.limit * 1 || 100; // default 100
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeature;
