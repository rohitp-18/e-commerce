class Apifeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit", "sort"];

    removeFields.forEach((el) => delete queryCopy[el]);

    let querySt = JSON.stringify(queryCopy);

    querySt = querySt.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(querySt));

    return this;
  }

  pagination(pages) {
    const page = Number(this.queryStr.page) || 1;

    let skip = pages * (page - 1);

    this.query = this.query.limit(pages).skip(skip);

    return this;
  }
}

module.exports = Apifeatures;
