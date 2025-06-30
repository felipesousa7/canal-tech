import express from 'express';
import { ArticleController } from '../controllers/ArticleController';

const router = express.Router();
const articleController = new ArticleController();

// GET /articles - Listar todos os artigos
router.get('/', articleController.getAllArticles);

// GET /articles/slug/:slug - Buscar artigo por slug (DEVE vir ANTES de /:id)
router.get('/slug/:slug', articleController.getArticleBySlug);

// GET /articles/:id - Buscar artigo por ID (DEVE vir DEPOIS de /slug/:slug)
router.get('/:id', articleController.getArticleById);

// POST /articles - Criar novo artigo
router.post('/', articleController.createArticle);

// PUT /articles/:id - Atualizar artigo
router.put('/:id', articleController.updateArticle);

// DELETE /articles/:id - Deletar artigo
router.delete('/:id', articleController.deleteArticle);

export default router;
