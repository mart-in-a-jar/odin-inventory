export const paginationFunction = async (
    model,
    req,
    res,
    total,
    url
) => {
    const paginate = +req.query.paginate;
    const page = +req.query.page || 1;

    const skipAmount = (page - 1) * paginate;
    const categorySegment = await model
        .find({}, null, {
            limit: paginate,
            skip: skipAmount,
        })
        .exec();

    const firstShown = skipAmount + 1;
    const isLastPage = skipAmount + paginate >= total;

    const resultObject = {
        total: total,
        segment: undefined,
        data: categorySegment,
    };

    if (skipAmount < total) {
        resultObject.segment = {
            from: firstShown,
            to: isLastPage ? total : skipAmount + paginate,
        };
        // Page doesn't exist
    } else {
        return res
            .status(400)
            .json({ error: { message: "overflow", code: 400 } });
    }
    if (!isLastPage) {
        resultObject.nextPage = `${url}?paginate=${paginate}&page=${
            page + 1 || 2
        }`;
    }

    return res.json(resultObject);
};
