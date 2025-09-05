// 财富产品推荐系统 - Deno Deploy 修复版
const products = [
    { 
        id: 1, 
        name: "宁银理财稳享盈增强型理财产品", 
        bank: "宁银理财", 
        return_rate: 4.2, 
        risk_level: "中等风险", 
        type: "净值型", 
        duration: "365天", 
        min_amount: 50000, 
        description: "稳健收益型理财产品，适合风险偏好中等的投资者" 
    },
    { 
        id: 2, 
        name: "杭银理财幸福添利净值型理财产品", 
        bank: "杭银理财", 
        return_rate: 4.85, 
        risk_level: "中等风险", 
        type: "净值型", 
        duration: "360天", 
        min_amount: 50000, 
        description: "净值化管理的理财产品，收益表现稳健" 
    },
    { 
        id: 3, 
        name: "工银理财恒盛固收增强型理财产品", 
        bank: "工银理财", 
        return_rate: 4.6, 
        risk_level: "中等风险", 
        type: "固收增强", 
        duration: "182天", 
        min_amount: 10000, 
        description: "固定收益增强策略，追求稳健收益" 
    },
    { 
        id: 4, 
        name: "招银理财日日盈现金管理类产品", 
        bank: "招银理财", 
        return_rate: 3.2, 
        risk_level: "低风险", 
        type: "货币型", 
        duration: "活期", 
        min_amount: 1000, 
        description: "低风险现金管理产品，资金随存随取" 
    },
    { 
        id: 5, 
        name: "光大理财阳光金步步高净值型理财", 
        bank: "光大理财", 
        return_rate: 5.1, 
        risk_level: "中高风险", 
        type: "权益增强", 
        duration: "540天", 
        min_amount: 100000, 
        description: "权益投资增强策略，追求较高收益" 
    }
];

function generateHTML() {
    const productRows = products.map(product => {
        const escapedName = product.name.replace(/'/g, "\\'");
        return `
            <tr>
                <td><strong>${product.name}</strong></td>
                <td>${product.type}</td>
                <td style="color:#e74c3c;font-weight:bold">${product.return_rate}%</td>
                <td><span class="risk-badge">${product.risk_level}</span></td>
                <td>${product.bank}</td>
                <td>${product.description}</td>
                <td><button class="btn" onclick="showRecommendation('${escapedName}')">💬 推荐话术</button></td>
            </tr>
        `;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>财富产品推荐系统</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
            background: #f5f5f7;
            color: #333;
            line-height: 1.6;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 0;
            text-align: center;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 300;
        }
        .header .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px 20px;
        }
        .cloud-badge {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00d4aa;
            color: white;
            padding: 10px 18px;
            border-radius: 25px;
            font-size: 12px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0,212,170,0.3);
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            text-align: center;
            transition: transform 0.3s ease;
        }
        .stat-card:hover {
            transform: translateY(-5px);
        }
        .stat-number {
            font-size: 2.2em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 8px;
        }
        .stat-label {
            color: #666;
            font-size: 1em;
        }
        .products-section {
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            overflow: hidden;
        }
        .section-header {
            padding: 25px;
            border-bottom: 1px solid #eee;
            background: #fafafa;
        }
        .section-title {
            font-size: 1.4em;
            font-weight: 600;
            color: #333;
            margin: 0;
        }
        .products-table {
            width: 100%;
            border-collapse: collapse;
        }
        .products-table th,
        .products-table td {
            padding: 18px 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        .products-table th {
            background: #f8f9fa;
            font-weight: 600;
            color: #555;
            font-size: 0.95em;
        }
        .products-table tr:hover {
            background: #f8f9ff;
        }
        .risk-badge {
            padding: 5px 15px;
            border-radius: 25px;
            font-size: 0.85em;
            font-weight: 500;
            background: #fff3cd;
            color: #856404;
        }
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            background: #667eea;
            color: white;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: #5a67d8;
            transform: translateY(-2px);
        }
        @media (max-width: 768px) {
            .cloud-badge {
                position: static;
                margin: 15px auto;
                display: block;
                width: fit-content;
            }
            .stats {
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }
            .products-table {
                font-size: 0.9em;
            }
            .products-table th,
            .products-table td {
                padding: 12px 10px;
            }
            .header h1 {
                font-size: 2em;
            }
            .container {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="cloud-badge">🦕 Deno Deploy</div>
    <div class="header">
        <h1>✨ 财富产品推荐系统 🧠</h1>
        <p class="subtitle">智能推荐 · 云端服务 · 精准投资 · Powered by Deno</p>
    </div>
    <div class="container">
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${products.length}</div>
                <div class="stat-label">产品总数</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${products.filter(p => p.return_rate > 4.5).length}</div>
                <div class="stat-label">高收益产品</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${products.filter(p => p.risk_level === '低风险').length}</div>
                <div class="stat-label">低风险产品</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">在线</div>
                <div class="stat-label">服务状态</div>
            </div>
        </div>
        
        <div class="products-section">
            <div class="section-header">
                <h2 class="section-title">💰 推荐产品</h2>
            </div>
            <table class="products-table">
                <thead>
                    <tr>
                        <th>产品名称</th>
                        <th>类型</th>
                        <th>预期收益率</th>
                        <th>风险等级</th>
                        <th>发行机构</th>
                        <th>描述</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${productRows}
                </tbody>
            </table>
        </div>
    </div>

    <script>
        async function showRecommendation(productName) {
            try {
                const response = await fetch("/api/recommend?product=" + encodeURIComponent(productName));
                const data = await response.json();
                if (data.success) {
                    alert("推荐话术:\\n\\n" + data.recommendation_script.full_script);
                } else {
                    alert("获取推荐话术失败：" + data.error);
                }
            } catch (error) {
                alert("网络错误，请稍后重试");
            }
        }
    </script>
</body>
</html>`;

    return html;
}

async function handler(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    });

    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers });
    }

    if (pathname === '/' || pathname === '/index.html') {
        return new Response(generateHTML(), {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

    if (pathname === '/api/status') {
        const response = {
            success: true,
            status: 'running',
            message: '财富产品推荐系统运行正常 - Deno Deploy',
            platform: 'Deno Deploy',
            version: '1.0.1',
            timestamp: new Date().toISOString(),
        };
        return new Response(JSON.stringify(response), { status: 200, headers });
    }

    if (pathname === '/api/products') {
        const response = {
            success: true,
            data: products,
            total: products.length,
            platform: 'Deno Deploy',
            timestamp: new Date().toISOString(),
        };
        return new Response(JSON.stringify(response), { status: 200, headers });
    }

    if (pathname === '/api/recommend') {
        const productName = url.searchParams.get('product');
        
        if (!productName) {
            const errorResponse = {
                success: false,
                error: '请提供产品名称'
            };
            return new Response(JSON.stringify(errorResponse), { status: 400, headers });
        }
        
        const product = products.find(p => p.name === productName);
        if (!product) {
            const errorResponse = {
                success: false,
                error: '产品不存在'
            };
            return new Response(JSON.stringify(errorResponse), { status: 404, headers });
        }
        
        const recommendationScript = `【${product.name} 专业推荐话术】

您好！根据您的投资需求，我特别推荐${product.name}。

产品亮点：
• 预期年化收益率${product.return_rate}%
• ${product.risk_level}
• ${product.bank}专业管理
• 起投${product.min_amount.toLocaleString()}元

这款产品${product.description}，建议您重点考虑。`;

        const recommendation = {
            success: true,
            product_name: product.name,
            recommendation_script: {
                opening: `您好！我向您推荐一款优质理财产品——${product.name}。`,
                features: [
                    `预期年化收益率${product.return_rate}%，收益表现优异`,
                    `${product.risk_level}，符合稳健投资理念`,
                    `由${product.bank}发行管理，品牌信誉有保障`,
                    `起投金额${product.min_amount.toLocaleString()}元`
                ],
                closing: `${product.name}是一款性价比很高的理财产品，建议您可以考虑配置。`,
                full_script: recommendationScript
            },
            platform: 'Deno Deploy',
            timestamp: new Date().toISOString(),
        };
        
        return new Response(JSON.stringify(recommendation), { status: 200, headers });
    }

    const notFoundResponse = {
        success: false,
        error: 'API接口不存在',
        path: pathname,
        available_paths: ['/', '/api/status', '/api/products', '/api/recommend']
    };
    return new Response(JSON.stringify(notFoundResponse), { status: 404, headers });
}

Deno.serve(handler);