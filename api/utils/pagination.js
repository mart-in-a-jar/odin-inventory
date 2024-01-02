export const paginationFunction = async (
    model,
    query,
    req,
    res,
    total,
    url,
    populate = null,
    sort
) => {
    const paginate = +req.query.paginate;
    const page = +req.query.page || 1;
    let categorySegment;

    const skipAmount = (page - 1) * paginate;
    if (populate) {
        categorySegment = await model
            .find(query, null, {
                limit: paginate,
                skip: skipAmount,
            })
            .collation({ locale: "en", strength: 2 })
            .sort(sort)
            .populate(populate.field, populate.filter)
            .exec();
    } else {
        categorySegment = await model
            .find(query, null, {
                limit: paginate,
                skip: skipAmount,
            })
            .collation({ locale: "en", strength: 2 })
            .sort(sort)
            .exec();
    }

    const firstShown = skipAmount + 1;
    const isLastPage = skipAmount + paginate >= total;
    const numberOfPages = Math.ceil(total / paginate);

    const resultObject = {
        total: total,
        pages: numberOfPages,
        segment: undefined,
        data: categorySegment,
    };

    if (skipAmount < total) {
        resultObject.segment = {
            total: paginate,
            from: firstShown,
            to: isLastPage ? total : skipAmount + paginate,
        };
        // Page doesn't exist
    } else {
        return res
            .status(400)
            .json({ error: { message: "overflow", code: 400 } });
    }
    if (page !== 1) {
        resultObject.prevPage = `${url}?paginate=${paginate}&page=${page - 1}`;
    }
    if (!isLastPage) {
        resultObject.nextPage = `${url}?paginate=${paginate}&page=${
            page + 1 || 2
        }`;
    }

    return res.json(resultObject);
};
