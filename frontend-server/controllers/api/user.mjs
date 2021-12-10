import { uuid } from "#helpers/helpers";
import { sign } from "#helpers/auth";

export async function login(req, res, errorHandler) {
    try {
        const { userName } = req.body;

        const token = await sign({ userId: uuid(), userName });
        res.status(200).json({ token });
    } catch (e) {
        errorHandler(e);
    }
}
