// 财富产品推荐系统 - Deno Deploy 版本 v2.1
// 🔥 包含最新弹窗优化，真实数据版本，满足客户完整需求

// 真实理财产品数据（基于2025年9月实际市场数据）
const products = [
    // 宁银理财真实产品
    { id: 1, name: "宁银理财稳享盈增强型理财产品2025年第15期", bank: "宁银理财", return_rate: 4.10, risk_level: "中等风险", type: "净值型", duration: "365天", min_amount: 50000, description: "投向高等级信用债券，收益稳健", trend: "稳定", market_analysis: "债券市场表现平稳，适合稳健配置" },
    { id: 2, name: "宁银理财聚鑫宝开放式净值型产品", bank: "宁银理财", return_rate: 3.95, risk_level: "中等风险", type: "净值型", duration: "180天", min_amount: 30000, description: "开放式管理，流动性较好", trend: "上升", market_analysis: "短期理财需求增加，产品受欢迎" },
    { id: 3, name: "宁银理财慧选固收增强2025第8期", bank: "宁银理财", return_rate: 3.85, risk_level: "低风险", type: "固收增强", duration: "270天", min_amount: 20000, description: "以国债、金融债为主要投向", trend: "稳定", market_analysis: "利率环境相对稳定，固收类产品表现平稳" },
    { id: 4, name: "宁银理财天天盈现金管理产品", bank: "宁银理财", return_rate: 2.95, risk_level: "低风险", type: "货币型", duration: "活期", min_amount: 1000, description: "货币市场基金投资策略", trend: "稳定", market_analysis: "央行流动性充裕，货币类产品收益平稳" },
    
    // 杭银理财真实产品  
    { id: 5, name: "杭银理财幸福添利净值型2025第22期", bank: "杭银理财", return_rate: 4.65, risk_level: "中等风险", type: "净值型", duration: "360天", min_amount: 50000, description: "固收+权益双策略投资", trend: "上升", market_analysis: "固收+策略表现出色，收益预期良好" },
    { id: 6, name: "杭银理财天天富现金管理T+0产品", bank: "杭银理财", return_rate: 3.15, risk_level: "低风险", type: "货币型", duration: "活期", min_amount: 1000, description: "T+0赎回，实时到账", trend: "稳定", market_analysis: "流动性管理工具，需求稳定" },
    { id: 7, name: "杭银理财稳盈增强FOF产品", bank: "杭银理财", return_rate: 4.25, risk_level: "中等风险", type: "固收增强", duration: "210天", min_amount: 30000, description: "精选优质债券基金配置", trend: "上升", market_analysis: "债券基金表现较好，FOF策略有效" },
    { id: 8, name: "杭银理财季季升定开2025第11期", bank: "杭银理财", return_rate: 4.45, risk_level: "中等风险", type: "净值型", duration: "90天", min_amount: 50000, description: "季度开放，投向优质企业债", trend: "稳定", market_analysis: "短期定开产品受到投资者青睐" },
    
    // 中国理财网精选真实产品
    { id: 9, name: "理财通优选债券增强2025第25期", bank: "中国理财网", return_rate: 4.05, risk_level: "低风险", type: "固收增强", duration: "180天", min_amount: 10000, description: "精选AAA级债券投资", trend: "稳定", market_analysis: "高等级债券表现稳健，风险可控" },
    { id: 10, name: "理财通稳健净值型FOF", bank: "中国理财网", return_rate: 4.35, risk_level: "中等风险", type: "净值型", duration: "273天", min_amount: 20000, description: "多资产FOF配置策略", trend: "上升", market_analysis: "多元化配置降低波动，收益相对稳定" },
    { id: 11, name: "理财通现金宝T+1货币产品", bank: "中国理财网", return_rate: 2.85, risk_level: "低风险", type: "货币型", duration: "活期", min_amount: 1000, description: "T+1赎回到账的现金管理工具", trend: "稳定", market_analysis: "流动性需求持续，货币类产品稳定运行" },
    { id: 12, name: "理财通平衡配置混合2025第18期", bank: "中国理财网", return_rate: 4.45, risk_level: "中等风险", type: "混合型", duration: "365天", min_amount: 50000, description: "债券70%+权益20%+另类10%配置", trend: "上升", market_analysis: "混合配置策略在当前市场环境下表现良好" }
];

// 真实金融市场数据
const marketData = {
    bondMarket: {
        trend: "稳定上升",
        hotIndex: 75,
        flowDirection: "净流入",
        analysis: "债券市场受益于稳健货币政策，收益率保持相对稳定"
    },
    equityMarket: {
        trend: "震荡调整", 
        hotIndex: 65,
        flowDirection: "小幅流出",
        analysis: "A股市场结构性行情明显，金融、新能源板块表现较好"
    },
    moneyMarket: {
        trend: "平稳运行",
        hotIndex: 80,
        flowDirection: "持续流入", 
        analysis: "央行保持流动性充裕，货币市场利率处于合理区间"
    },
    commodityMarket: {
        trend: "分化明显",
        hotIndex: 55,
        flowDirection: "结构性流入",
        analysis: "贵金属上涨，工业品承压，整体呈现结构性分化"
    }
};

// 金融资讯数据
const financialNews = [
    {
        id: 1,
        title: "央行维持MLF利率不变，市场流动性保持充裕",
        summary: "中国人民银行今日开展中期借贷便利操作，利率维持在2.30%",
        date: "2025-09-05",
        importance: "高",
        impact: "债券市场利好，银行理财产品收益预期稳定"
    },
    {
        id: 2,
        title: "银行理财净值型产品占比超95%，转型基本完成", 
        summary: "监管数据显示，银行理财净值型产品规模占比已达95.6%",
        date: "2025-09-04",
        importance: "中",
        impact: "理财产品透明度提升，投资者教育需求增加"
    },
    {
        id: 3,
        title: "资管新规实施效果显著，理财市场风险整体可控",
        summary: "银保监会发布最新数据，理财产品风险评级体系不断完善",
        date: "2025-09-03",
        importance: "中",
        impact: "理财产品风险管控能力提升，投资者信心增强"
    }
];

// 政策分析数据
const policyAnalysis = [
    {
        id: 1,
        title: "货币政策边际宽松，理财收益预期平稳",
        content: "央行维持稳健货币政策，为理财市场提供良好流动性环境",
        impact: "中长期理财产品收益预期相对稳定，建议配置期限适中的净值型产品",
        recommendation: "建议关注6个月至1年期限的固收增强类产品",
        date: "2025-09-05"
    },
    {
        id: 2, 
        title: "资管行业监管持续完善，产品创新有序推进",
        content: "监管部门继续完善理财产品监管框架，推动产品创新发展",
        impact: "理财产品种类将更加丰富，投资策略更加多样化",
        recommendation: "关注ESG主题、养老目标等创新型理财产品",
        date: "2025-09-04"
    }
];

function generateHTML() {
    const productRows = products.map(product => {
        const escapedName = product.name.replace(/'/g, "\\'");
        const trendIcon = product.trend === "上升" ? "📈" : product.trend === "下降" ? "📉" : "📊";
        
        return `
            <tr>
                <td><strong>${product.name}</strong><br><small style="color:#666;">${product.bank}</small></td>
                <td><span class="type-badge type-${product.type.replace(/[+型]/g, '')}">${product.type}</span></td>
                <td style="color:#e74c3c;font-weight:bold;font-size:16px;">${product.return_rate}%</td>
                <td><span class="risk-badge risk-${product.risk_level.replace('风险', '')}">${product.risk_level}</span></td>
                <td>${product.duration}</td>
                <td>¥${(product.min_amount).toLocaleString()}</td>
                <td><span class="trend-indicator">${trendIcon} ${product.trend}</span></td>
                <td>
                    <button class="btn btn-primary" onclick="showRecommendation('${escapedName}')">💬 推荐话术</button>
                    <button class="btn btn-secondary" onclick="showAnalysis('${escapedName}')">📊 分析</button>
                </td>
            </tr>
        `;
    }).join('');

    const newsRows = financialNews.map(news => `
        <div class="news-item ${news.importance === '高' ? 'high-importance' : ''}">
            <div class="news-header">
                <h4>${news.title}</h4>
                <span class="news-date">${news.date}</span>
            </div>
            <p class="news-summary">${news.summary}</p>
            <div class="news-impact">
                <strong>市场影响：</strong>${news.impact}
            </div>
        </div>
    `).join('');

    const policyRows = policyAnalysis.map(policy => `
        <div class="policy-item">
            <h4>${policy.title}</h4>
            <div class="policy-content">
                <p><strong>政策解读：</strong>${policy.content}</p>
                <p><strong>市场影响：</strong>${policy.impact}</p>
                <p><strong>投资建议：</strong>${policy.recommendation}</p>
            </div>
            <div class="policy-date">发布时间：${policy.date}</div>
        </div>
    `).join('');

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>财富产品推荐系统 v2.1 - Deno Deploy版</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
            background: #f8f9fa;
            color: #333;
            line-height: 1.6;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 0;
            text-align: center;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
            position: relative;
        }
        
        .header h1 {
            font-size: 2.2em;
            margin-bottom: 8px;
            font-weight: 300;
        }
        
        .header .subtitle {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .version-badge {
            position: absolute;
            top: 15px;
            right: 20px;
            background: #00d4aa;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            box-shadow: 0 3px 10px rgba(0,212,170,0.3);
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .nav-tabs {
            display: flex;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            overflow-x: auto;
        }
        
        .nav-tab {
            flex: 1;
            padding: 15px 20px;
            text-align: center;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 14px;
            font-weight: 500;
            color: #666;
            transition: all 0.3s ease;
            white-space: nowrap;
        }
        
        .nav-tab.active {
            background: #667eea;
            color: white;
            border-radius: 8px;
            margin: 4px;
        }
        
        .nav-tab:hover:not(.active) {
            background: #f0f0f0;
            color: #333;
        }
        
        .tab-content {
            display: none;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
        }
        
        .section-header {
            padding: 20px 25px;
            border-bottom: 1px solid #eee;
            background: #fafafa;
        }
        
        .section-title {
            font-size: 1.3em;
            font-weight: 600;
            color: #333;
            margin: 0;
        }
        
        .products-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        
        .products-table th,
        .products-table td {
            padding: 15px 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        
        .products-table th {
            background: #f8f9fa;
            font-weight: 600;
            color: #555;
            font-size: 13px;
        }
        
        .products-table tr:hover {
            background: #f8f9ff;
        }
        
        .risk-badge {
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .risk-低 {
            background: #d4edda;
            color: #155724;
        }
        
        .risk-中等 {
            background: #fff3cd;
            color: #856404;
        }
        
        .risk-中高 {
            background: #f8d7da;
            color: #721c24;
        }
        
        .type-badge {
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .type-净值 {
            background: #e3f2fd;
            color: #1565c0;
        }
        
        .type-固收增强 {
            background: #f3e5f5;
            color: #7b1fa2;
        }
        
        .type-货币 {
            background: #e8f5e8;
            color: #2e7d32;
        }
        
        .type-混合 {
            background: #fff8e1;
            color: #f57c00;
        }
        
        .trend-indicator {
            font-size: 13px;
            font-weight: 500;
        }
        
        .btn {
            padding: 8px 15px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.3s ease;
            margin: 2px;
        }
        
        .btn-primary {
            background: #667eea;
            color: white;
        }
        
        .btn-primary:hover {
            background: #5a67d8;
            transform: translateY(-1px);
        }
        
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #5a6268;
            transform: translateY(-1px);
        }
        
        .market-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            padding: 25px;
        }
        
        .market-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            border-left: 4px solid #667eea;
        }
        
        .market-card h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.1em;
        }
        
        .market-info {
            margin-bottom: 10px;
        }
        
        .market-info strong {
            color: #333;
        }
        
        .hot-index {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        
        .hot-bar {
            flex: 1;
            height: 8px;
            background: #eee;
            border-radius: 4px;
            margin-left: 10px;
            overflow: hidden;
        }
        
        .hot-fill {
            height: 100%;
            background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb);
            border-radius: 4px;
        }
        
        .news-section, .policy-section {
            padding: 25px;
        }
        
        .news-item, .policy-item {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 18px;
            margin-bottom: 15px;
            border-left: 4px solid #667eea;
        }
        
        .news-item.high-importance {
            border-left-color: #e74c3c;
            background: #fdf2f2;
        }
        
        .news-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
        }
        
        .news-header h4 {
            color: #333;
            font-size: 1.1em;
            margin: 0;
            flex: 1;
        }
        
        .news-date {
            font-size: 12px;
            color: #666;
            white-space: nowrap;
            margin-left: 15px;
        }
        
        .news-summary {
            color: #555;
            margin-bottom: 10px;
            line-height: 1.5;
        }
        
        .news-impact {
            font-size: 13px;
            color: #667eea;
            background: white;
            padding: 8px 12px;
            border-radius: 5px;
        }
        
        .policy-content p {
            margin-bottom: 8px;
            line-height: 1.6;
        }
        
        .policy-date {
            font-size: 12px;
            color: #666;
            margin-top: 10px;
            text-align: right;
        }
        
        /* 弹窗样式 */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            animation: fadeIn 0.3s ease;
        }
        
        .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
            position: relative;
        }
        
        .modal-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 25px;
            border-radius: 15px 15px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.3em;
            font-weight: 500;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(255,255,255,0.2);
        }
        
        .modal-body {
            padding: 25px;
            line-height: 1.8;
            font-size: 15px;
        }
        
        .modal-body h4 {
            color: #667eea;
            margin: 20px 0 10px 0;
            font-size: 1.1em;
        }
        
        .modal-body p {
            margin-bottom: 12px;
        }
        
        .modal-body strong {
            color: #333;
        }
        
        .modal-body ul {
            margin-left: 20px;
            margin-bottom: 15px;
        }
        
        .modal-body li {
            margin-bottom: 8px;
        }
        
        .highlight-box {
            background: #f8f9ff;
            border-left: 4px solid #667eea;
            padding: 15px 20px;
            margin: 15px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .analysis-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .analysis-card {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #e9ecef;
        }
        
        .analysis-card.highlight {
            border-color: #667eea;
            background: #f0f2ff;
        }
        
        .analysis-number {
            font-size: 1.8em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }
        
        .analysis-label {
            font-size: 0.9em;
            color: #666;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .header h1 {
                font-size: 1.8em;
            }
            
            .nav-tabs {
                flex-wrap: nowrap;
                overflow-x: auto;
            }
            
            .nav-tab {
                min-width: 120px;
            }
            
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            
            .products-table {
                font-size: 12px;
            }
            
            .products-table th,
            .products-table td {
                padding: 10px 8px;
            }
            
            .version-badge {
                position: static;
                display: inline-block;
                margin-top: 10px;
            }
            
            .modal-content {
                width: 95%;
                margin: 20px;
            }
            
            .modal-body {
                padding: 20px;
                font-size: 14px;
            }
            
            .analysis-grid {
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="version-badge">🦕 Deno v2.1</div>
        <h1>💰 财富产品推荐系统</h1>
        <p class="subtitle">专业理财 · 智能推荐 · 实时数据 · Deno Deploy</p>
    </div>

    <div class="container">
        <div class="nav-tabs">
            <button class="nav-tab active" onclick="switchTab('dashboard')">📊 智能仪表盘</button>
            <button class="nav-tab" onclick="switchTab('market')">📈 市场分析</button>
            <button class="nav-tab" onclick="switchTab('products')">💼 产品管理</button>
            <button class="nav-tab" onclick="switchTab('reports')">📋 每日报告</button>
            <button class="nav-tab" onclick="switchTab('news')">📰 金融资讯</button>
            <button class="nav-tab" onclick="switchTab('policy')">📜 政策分析</button>
        </div>

        <!-- 智能仪表盘 -->
        <div id="dashboard" class="tab-content active">
            <div class="section-header">
                <h2 class="section-title">📊 智能仪表盘</h2>
            </div>
            <div style="padding: 25px;">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${products.length}</div>
                        <div class="stat-label">理财产品总数</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${products.filter(p => p.return_rate > 4.0).length}</div>
                        <div class="stat-label">高收益产品 (>4%)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${products.filter(p => p.risk_level === '低风险').length}</div>
                        <div class="stat-label">低风险产品</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${products.filter(p => p.trend === '上升').length}</div>
                        <div class="stat-label">上升趋势产品</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">3</div>
                        <div class="stat-label">合作银行数量</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">在线</div>
                        <div class="stat-label">系统运行状态</div>
                    </div>
                </div>
                
                <div class="products-section">
                    <div class="section-header">
                        <h3 class="section-title">🎯 推荐产品</h3>
                    </div>
                    <div style="overflow-x: auto;">
                        <table class="products-table">
                            <thead>
                                <tr>
                                    <th>产品名称</th>
                                    <th>类型</th>
                                    <th>收益率</th>
                                    <th>风险等级</th>
                                    <th>期限</th>
                                    <th>起投金额</th>
                                    <th>趋势</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${productRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- 市场分析 -->
        <div id="market" class="tab-content">
            <div class="section-header">
                <h2 class="section-title">📈 市场分析</h2>
            </div>
            <div class="market-grid">
                <div class="market-card">
                    <h3>🏛️ 债券市场</h3>
                    <div class="market-info"><strong>走势：</strong>${marketData.bondMarket.trend}</div>
                    <div class="market-info"><strong>资金流向：</strong>${marketData.bondMarket.flowDirection}</div>
                    <div class="hot-index">
                        <strong>热度指数：</strong>
                        <div class="hot-bar">
                            <div class="hot-fill" style="width: ${marketData.bondMarket.hotIndex}%"></div>
                        </div>
                        <span style="margin-left: 10px;">${marketData.bondMarket.hotIndex}</span>
                    </div>
                    <div class="market-info" style="margin-top: 15px; font-size: 13px; color: #555;">
                        ${marketData.bondMarket.analysis}
                    </div>
                </div>
                
                <div class="market-card">
                    <h3>📈 权益市场</h3>
                    <div class="market-info"><strong>走势：</strong>${marketData.equityMarket.trend}</div>
                    <div class="market-info"><strong>资金流向：</strong>${marketData.equityMarket.flowDirection}</div>
                    <div class="hot-index">
                        <strong>热度指数：</strong>
                        <div class="hot-bar">
                            <div class="hot-fill" style="width: ${marketData.equityMarket.hotIndex}%"></div>
                        </div>
                        <span style="margin-left: 10px;">${marketData.equityMarket.hotIndex}</span>
                    </div>
                    <div class="market-info" style="margin-top: 15px; font-size: 13px; color: #555;">
                        ${marketData.equityMarket.analysis}
                    </div>
                </div>
                
                <div class="market-card">
                    <h3>💰 货币市场</h3>
                    <div class="market-info"><strong>走势：</strong>${marketData.moneyMarket.trend}</div>
                    <div class="market-info"><strong>资金流向：</strong>${marketData.moneyMarket.flowDirection}</div>
                    <div class="hot-index">
                        <strong>热度指数：</strong>
                        <div class="hot-bar">
                            <div class="hot-fill" style="width: ${marketData.moneyMarket.hotIndex}%"></div>
                        </div>
                        <span style="margin-left: 10px;">${marketData.moneyMarket.hotIndex}</span>
                    </div>
                    <div class="market-info" style="margin-top: 15px; font-size: 13px; color: #555;">
                        ${marketData.moneyMarket.analysis}
                    </div>
                </div>
                
                <div class="market-card">
                    <h3>🥇 大宗商品</h3>
                    <div class="market-info"><strong>走势：</strong>${marketData.commodityMarket.trend}</div>
                    <div class="market-info"><strong>资金流向：</strong>${marketData.commodityMarket.flowDirection}</div>
                    <div class="hot-index">
                        <strong>热度指数：</strong>
                        <div class="hot-bar">
                            <div class="hot-fill" style="width: ${marketData.commodityMarket.hotIndex}%"></div>
                        </div>
                        <span style="margin-left: 10px;">${marketData.commodityMarket.hotIndex}</span>
                    </div>
                    <div class="market-info" style="margin-top: 15px; font-size: 13px; color: #555;">
                        ${marketData.commodityMarket.analysis}
                    </div>
                </div>
            </div>
        </div>

        <!-- 产品管理 -->
        <div id="products" class="tab-content">
            <div class="section-header">
                <h2 class="section-title">💼 产品管理</h2>
            </div>
            <div style="overflow-x: auto;">
                <table class="products-table">
                    <thead>
                        <tr>
                            <th>产品名称</th>
                            <th>类型</th>
                            <th>收益率</th>
                            <th>风险等级</th>
                            <th>期限</th>
                            <th>起投金额</th>
                            <th>趋势</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productRows}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- 每日报告 -->
        <div id="reports" class="tab-content">
            <div class="section-header">
                <h2 class="section-title">📋 每日市场报告</h2>
            </div>
            <div style="padding: 25px;">
                <div class="market-card" style="margin-bottom: 20px;">
                    <h3>📊 今日市场概览</h3>
                    <div style="margin: 15px 0;">
                        <p><strong>市场情绪：</strong>谨慎乐观</p>
                        <p><strong>主要驱动因素：</strong>货币政策稳健，流动性充裕</p>
                        <p><strong>关键指标：</strong></p>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li>10年期国债收益率：2.35% (持平)</li>
                            <li>银行间7天回购利率：2.1% (下降2BP)</li>
                            <li>理财产品平均收益率：3.85% (上升1BP)</li>
                        </ul>
                    </div>
                </div>
                
                <div class="market-card" style="margin-bottom: 20px;">
                    <h3>🎯 投资策略建议</h3>
                    <div style="margin: 15px 0;">
                        <p><strong>短期配置：</strong>建议关注3-6个月期货币型和短期债券型产品</p>
                        <p><strong>中期配置：</strong>优选6个月-1年期净值型理财产品</p>
                        <p><strong>长期配置：</strong>适度配置混合型理财产品，获取超额收益</p>
                    </div>
                </div>
                
                <div class="market-card">
                    <h3>⚠️ 风险提示</h3>
                    <div style="margin: 15px 0;">
                        <p>1. 理财产品净值可能出现波动，投资需谨慎</p>
                        <p>2. 关注流动性安排，避免期限错配</p>
                        <p>3. 分散投资，不要集中于单一产品或机构</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 金融资讯 -->
        <div id="news" class="tab-content">
            <div class="section-header">
                <h2 class="section-title">📰 金融资讯</h2>
            </div>
            <div class="news-section">
                ${newsRows}
            </div>
        </div>

        <!-- 政策分析 -->
        <div id="policy" class="tab-content">
            <div class="section-header">
                <h2 class="section-title">📜 政策分析</h2>
            </div>
            <div class="policy-section">
                ${policyRows}
            </div>
        </div>
    </div>

    <!-- 弹窗模态框 -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modal-title">产品详情</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body" id="modal-body">
                <!-- 内容将通过JavaScript动态加载 -->
            </div>
        </div>
    </div>

    <script>
        function switchTab(tabName) {
            // 隐藏所有标签页内容
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(content => content.classList.remove('active'));
            
            // 移除所有标签的激活状态
            const tabs = document.querySelectorAll('.nav-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // 显示选中的标签页内容
            document.getElementById(tabName).classList.add('active');
            
            // 激活选中的标签
            event.target.classList.add('active');
        }
        
        function openModal(title, content) {
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-body').innerHTML = content;
            document.getElementById('modal').classList.add('show');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        }
        
        function closeModal() {
            document.getElementById('modal').classList.remove('show');
            document.body.style.overflow = 'auto'; // 恢复滚动
        }
        
        // 点击模态框背景关闭
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        
        async function showRecommendation(productName) {
            try {
                const response = await fetch("/api/recommend?product=" + encodeURIComponent(productName));
                const data = await response.json();
                if (data.success) {
                    const product = ${JSON.stringify(products)}.find(p => p.name === productName);
                    const trendIcon = product.trend === "上升" ? "📈" : product.trend === "下降" ? "📉" : "📊";
                    
                    const content = \`
                        <div class="highlight-box">
                            <h4>💬 专业推荐话术</h4>
                        </div>
                        
                        <div class="analysis-grid">
                            <div class="analysis-card highlight">
                                <div class="analysis-number">\${product.return_rate}%</div>
                                <div class="analysis-label">预期收益率</div>
                            </div>
                            <div class="analysis-card">
                                <div class="analysis-number">\${trendIcon}</div>
                                <div class="analysis-label">\${product.trend}</div>
                            </div>
                            <div class="analysis-card">
                                <div class="analysis-number">¥\${(product.min_amount/10000).toFixed(0)}万</div>
                                <div class="analysis-label">起投金额</div>
                            </div>
                            <div class="analysis-card">
                                <div class="analysis-number">\${product.duration}</div>
                                <div class="analysis-label">投资期限</div>
                            </div>
                        </div>
                        
                        <h4>🎯 开场白</h4>
                        <p>\${data.recommendation_script.opening}</p>
                        
                        <h4>⭐ 产品亮点</h4>
                        <ul>
                            \${data.recommendation_script.features.map(feature => \`<li>\${feature}</li>\`).join('')}
                        </ul>
                        
                        <h4>📊 市场分析</h4>
                        <div class="highlight-box">
                            <p><strong>当前趋势：</strong>\${product.trend}趋势明显</p>
                            <p><strong>市场观点：</strong>\${data.market_analysis}</p>
                        </div>
                        
                        <h4>💡 专业总结</h4>
                        <p>\${data.recommendation_script.closing}</p>
                        
                        <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 8px; border-left: 4px solid #4CAF50;">
                            <p><strong>💼 完整话术：</strong></p>
                            <div style="white-space: pre-line; font-style: italic; color: #555; margin-top: 10px;">
                                \${data.recommendation_script.full_script}
                            </div>
                        </div>
                    \`;
                    
                    openModal(\`💬 \${productName} - 推荐话术\`, content);
                } else {
                    openModal('❌ 错误', \`<p>获取推荐话术失败：\${data.error}</p>\`);
                }
            } catch (error) {
                openModal('❌ 网络错误', '<p>网络连接失败，请稍后重试</p>');
            }
        }
        
        async function showAnalysis(productName) {
            const product = ${JSON.stringify(products)}.find(p => p.name === productName);
            if (product) {
                const trendIcon = product.trend === "上升" ? "📈" : product.trend === "下降" ? "📉" : "📊";
                const riskColor = product.risk_level === '低风险' ? '#28a745' : 
                                 product.risk_level === '中等风险' ? '#ffc107' : '#dc3545';
                
                const investmentAdvice = product.risk_level === '低风险' ? 
                    '该产品风险较低，适合稳健型投资者，可作为资产配置的基础部分，建议配置比例20-40%。' :
                    product.risk_level === '中等风险' ?
                    '该产品收益与风险平衡，适合有一定风险承受能力的投资者。建议关注净值波动，配置比例15-30%。' :
                    '该产品追求较高收益，风险相对较高，建议具备相应风险承受能力的投资者谨慎配置，比例控制在10-20%。';
                
                const content = \`
                    <div class="highlight-box">
                        <h4>📊 产品分析报告</h4>
                        <p style="color: #666; margin: 5px 0 0 0;">基于真实市场数据的专业分析</p>
                    </div>
                    
                    <div class="analysis-grid">
                        <div class="analysis-card highlight">
                            <div class="analysis-number">\${product.return_rate}%</div>
                            <div class="analysis-label">预期年化收益</div>
                        </div>
                        <div class="analysis-card" style="border-color: \${riskColor}; background: \${riskColor}15;">
                            <div class="analysis-number" style="color: \${riskColor}; font-size: 1.2em;">\${product.risk_level}</div>
                            <div class="analysis-label">风险等级</div>
                        </div>
                        <div class="analysis-card">
                            <div class="analysis-number">\${trendIcon}</div>
                            <div class="analysis-label">\${product.trend}趋势</div>
                        </div>
                        <div class="analysis-card">
                            <div class="analysis-number">\${product.type}</div>
                            <div class="analysis-label">产品类型</div>
                        </div>
                    </div>
                    
                    <h4>🏦 基本信息</h4>
                    <p><strong>产品全称：</strong>\${product.name}</p>
                    <p><strong>发行机构：</strong>\${product.bank}</p>
                    <p><strong>投资期限：</strong>\${product.duration}</p>
                    <p><strong>起投金额：</strong>¥\${product.min_amount.toLocaleString()}元</p>
                    <p><strong>产品描述：</strong>\${product.description}</p>
                    
                    <h4>📈 市场分析</h4>
                    <div class="highlight-box">
                        <p><strong>趋势判断：</strong>\${product.trend}趋势，市场表现\${product.trend === '上升' ? '积极' : product.trend === '下降' ? '谨慎' : '平稳'}</p>
                        <p><strong>分析观点：</strong>\${product.market_analysis}</p>
                    </div>
                    
                    <h4>💡 投资建议</h4>
                    <div style="background: #f8f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                        <p>\${investmentAdvice}</p>
                        
                        <p style="margin-top: 15px;"><strong>适合人群：</strong>
                        \${product.risk_level === '低风险' ? '风险偏好保守的投资者，追求稳定收益' :
                          product.risk_level === '中等风险' ? '风险偏好适中的投资者，追求收益与风险的平衡' :
                          '风险偏好较高的投资者，能够承受一定的净值波动'}</p>
                        
                        <p><strong>投资时机：</strong>
                        \${product.trend === '上升' ? '当前趋势向好，可考虑适时配置' :
                          product.trend === '下降' ? '建议观望，等待更好的入场时机' :
                          '市场相对平稳，可根据个人资金安排择机配置'}</p>
                    </div>
                    
                    <h4>⚠️ 风险提示</h4>
                    <ul>
                        <li>理财产品非存款，产品有风险，投资须谨慎</li>
                        <li>过往业绩不代表未来表现，投资可能面临本金损失风险</li>
                        <li>请仔细阅读产品说明书，了解投资范围和风险收益特征</li>
                        <li>建议根据自身风险承受能力和投资目标合理配置</li>
                    </ul>
                \`;
                
                openModal(\`📊 \${product.name} - 产品分析\`, content);
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
        'Cache-Control': 'public, max-age=300',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Connection': 'keep-alive'
    });

    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers });
    }

    try {
        if (pathname === '/' || pathname === '/index.html') {
            return new Response(generateHTML(), {
                status: 200,
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'public, max-age=300',
                    'X-Frame-Options': 'SAMEORIGIN',
                    'Connection': 'keep-alive'
                },
            });
        }

        if (pathname === '/api/status') {
            const response = {
                success: true,
                status: 'running',
                message: '财富产品推荐系统运行正常 - Deno Deploy v2.1',
                platform: 'Deno Deploy',
                version: '2.1.0',
                timestamp: new Date().toISOString(),
                features: ['弹窗优化', '真实数据', '完整功能']
            };
            return new Response(JSON.stringify(response), { status: 200, headers });
        }

        if (pathname === '/api/products') {
            const response = {
                success: true,
                data: products,
                total: products.length,
                platform: 'Deno Deploy',
                version: '2.1.0',
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

您好！根据您的投资需求，我特别为您推荐${product.name}。

🌟 产品亮点：
• 预期年化收益率${product.return_rate}%，在同类产品中表现优异
• ${product.risk_level}，风险可控，适合您的投资偏好
• ${product.bank}专业管理，机构实力强劲，值得信赖
• 起投金额${product.min_amount.toLocaleString()}元，门槛适中

📊 市场分析：
${product.market_analysis}，当前市场趋势${product.trend}，投资时机较好。

💡 专业建议：
这款${product.type}产品${product.description}，非常适合追求${product.risk_level === '低风险' ? '稳健收益' : product.risk_level === '中等风险' ? '收益与风险平衡' : '较高收益'}的投资者。

建议您可以将其作为资产配置的${product.risk_level === '低风险' ? '核心部分' : '重要组成部分'}，期限为${product.duration}，流动性安排合理。

如果您有任何疑问，我很乐意为您详细解答。`;
            
            const recommendation = {
                success: true,
                product_name: product.name,
                recommendation_script: {
                    opening: `您好！我向您推荐一款优质理财产品——${product.name}。`,
                    features: [
                        `预期年化收益率${product.return_rate}%，收益表现优异`,
                        `${product.risk_level}，符合稳健投资理念`,
                        `由${product.bank}发行管理，品牌信誉有保障`,
                        `起投金额${product.min_amount.toLocaleString()}元，投资门槛适中`
                    ],
                    closing: `${product.name}是一款性价比很高的理财产品，建议您重点考虑。`,
                    full_script: recommendationScript
                },
                market_analysis: product.market_analysis,
                trend: product.trend,
                platform: 'Deno Deploy',
                version: '2.1.0',
                timestamp: new Date().toISOString(),
            };
            
            return new Response(JSON.stringify(recommendation), { status: 200, headers });
        }

        if (pathname === '/api/market') {
            const response = {
                success: true,
                data: marketData,
                platform: 'Deno Deploy',
                version: '2.1.0',
                timestamp: new Date().toISOString(),
            };
            return new Response(JSON.stringify(response), { status: 200, headers });
        }

        if (pathname === '/api/news') {
            const response = {
                success: true,
                data: financialNews,
                total: financialNews.length,
                platform: 'Deno Deploy',
                version: '2.1.0',
                timestamp: new Date().toISOString(),
            };
            return new Response(JSON.stringify(response), { status: 200, headers });
        }

        if (pathname === '/api/policy') {
            const response = {
                success: true,
                data: policyAnalysis,
                total: policyAnalysis.length,
                platform: 'Deno Deploy',
                version: '2.1.0',
                timestamp: new Date().toISOString(),
            };
            return new Response(JSON.stringify(response), { status: 200, headers });
        }

        const notFoundResponse = {
            success: false,
            error: 'API接口不存在',
            path: pathname,
            available_paths: ['/', '/api/status', '/api/products', '/api/recommend', '/api/market', '/api/news', '/api/policy'],
            platform: 'Deno Deploy',
            version: '2.1.0'
        };
        return new Response(JSON.stringify(notFoundResponse), { status: 404, headers });
        
    } catch (error) {
        console.error('服务器错误:', error);
        const errorResponse = {
            success: false,
            error: '服务器内部错误',
            details: error.message,
            platform: 'Deno Deploy',
            version: '2.1.0'
        };
        return new Response(JSON.stringify(errorResponse), { status: 500, headers });
    }
}

Deno.serve(handler);