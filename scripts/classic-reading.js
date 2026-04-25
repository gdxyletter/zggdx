        let currentClassicText = '';
        let selectedSentence = '';
        let currentReadingFontSize = 18;
        
        function updateSidebarForReview() {
            document.getElementById('annotationSection').style.display = 'none';
            document.getElementById('defaultAnnotationSection').style.display = 'none';
            document.getElementById('gradingSection').style.display = 'block';
            document.getElementById('versionSection').style.display = 'block';
        }
        
        function updateSidebarForClassic() {
            document.getElementById('annotationSection').style.display = 'block';
            document.getElementById('defaultAnnotationSection').style.display = 'block';
            document.getElementById('gradingSection').style.display = 'none';
            document.getElementById('versionSection').style.display = 'none';
        }
        
        function loadClassicText() {
            const selector = document.getElementById('classicSelector');
            const selectedValue = selector.value;
            
            if (!selectedValue) {
                document.getElementById('classicContent').style.display = 'none';
                return;
            }
            
            // 显示或隐藏自动检测选项
            const autoDetectOption = document.getElementById('classicAutoDetectOption');
            if (selectedValue.startsWith('daxue')) {
                autoDetectOption.style.display = 'block';
            } else {
                autoDetectOption.style.display = 'none';
            }
            
            // 这里是书籍来源的占位符，用户稍后会上传具体内容
            // 暂时使用示例文本
            const classicTexts = {
                'lunyu': {
                    title: '论语',
                    content: `子曰：「学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？」\n\n子曰：「温故而知新，可以为师矣。」\n\n子曰：「吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？」\n\n子曰：「道千乘之国，敬事而信，节用而爱人，使民以时。」`
                },
                'mengzi': {
                    title: '孟子',
                    content: `孟子曰：「天时不如地利，地利不如人和。」\n\n孟子曰：「民为贵，社稷次之，君为轻。」\n\n孟子曰：「富贵不能淫，贫贱不能移，威武不能屈，此之谓大丈夫。」\n\n孟子曰：「大人者，言不必信，行不必果，惟义所在。」`
                },
                'daxue_gu': {
                    title: '大学（郑玄古本）',
                    content: `大学之道，在明明德，在亲民，在止于至善。\n知止而后有定，定而后能静，静而后能安，安而后能虑，虑而后能得。\n物有本末，事有终始，知所先后，则近道矣。\n古之欲明明德于天下者，先治其国；欲治其国者，先齐其家；欲齐其家者，先修其身；欲修其身者，先正其心；欲正其心者，先诚其意；欲诚其意者，先致其知。\n致知在格物。\n物格而后知至，知至而后意诚，意诚而后心正，心正而后身修，身修而后家齐，家齐而后国治，国治而后天下平。\n自天子以至于庶人，壹是皆以修身为本。\n其本乱而末治者，否矣。\n其所厚者薄，而其所薄者厚，未之有也。\n此谓知本，此谓知之至也。\n所谓诚其意者，勿自欺也。\n如恶恶臭，如好好色，此之谓自谦。\n故君子必慎其独也。\n小人闲居为不善，无所不至。\n见君子而后厌然，掩其不善，而著其善。\n人之视己，如见其肺肝然，则何益矣。\n此谓诚于中，形于外。\n故君子必慎其独也。\n曾子曰：「十目所视，十手所指，其严乎！」\n富润屋，德润身，心广体胖，故君子必诚其意。\n《诗》云：「瞻彼淇澳，菉竹猗猗。有斐君子，如切如磋，如琢如磨。瑟兮侨兮，赫兮喧兮。有斐君子，终不可喧兮。」\n「如切如磋」者，道学也。\n「如琢如磨」者，自修也。\n「瑟兮侨兮」者，恂栗也。\n「赫兮喧兮」者，威仪也。\n「有斐君子，终不可喧兮」者，道盛德至善，民不能忘也。\n《诗》云：「于戏前王不忘！」\n君子贤其贤而亲其亲，小人乐其乐而利其利，此以没世不忘也。\n《康诰》曰：「克明德」\n《大甲》曰：「顾諟天之明命。」\n《帝典》曰：「克明峻德。」\n皆自明也。\n汤之《盘铭》曰：「苟日新，日日新，又日新。」\n《康诰》曰：「作新民。」\n《诗》曰：「周虽旧邦，其命惟新。」\n是故君子无所不用其极。\n《诗》云：「邦畿千里，惟民所止。」\n《诗》云：「缗蛮黄鸟，止于丘隅。」\n子曰：「于止，知其所止，可以人而不如鸟乎？」\n《诗》云：「穆穆文王，于缉熙敬止。」\n为人君，止于仁；为人臣，止于敬；为人子，止于孝；为人父，止于慈；与国人交，止于信。\n子曰：「听讼，吾犹人也。必也使无讼乎！」\n无情者，不得尽其辞。\n大畏民志，此谓知本。\n所谓修身在正其心者，身有所愤懑，则不得其正；有所恐惧，则不得其正；有所好乐，则不得其正；有所忧患，则不得其正。\n心不在焉，视而不见，听而不闻，食而不知其味。\n此谓修身在正其心。\n所谓齐其家在修其身者，人之其所亲爱而辟焉，之其所贱恶而辟焉，之其所畏敬而辟焉，之其所哀矜而辟焉，之其所敖惰而辟焉。\n好人之所恶，恶人之所好，是谓拂人之性，灾必逮夫身。\n是故君子有诸己而后求诸人，无诸己而后非诸人。\n所藏乎身不恕，而能喻诸人者，未之有也。\n故治国在齐其家。\n《诗》云：「桃之夭夭，其叶蓁蓁。之子于归，宜其家人。」\n宜其家人，而后可以教国人。\n《诗》云：「宜尔室家，乐尔妻帑。」\n是故父子兄弟足法，而后民法之也。\n此谓身不修，不可以齐其家。\n所谓平天下在治其国者，上老老而民兴孝，上长长而民兴弟，上恤孤而民不倍。\n是以君子有絜矩之道也。\n所恶于上，毋以使下；所恶于下，毋以事上；所恶于前，毋以先后；所恶于后，毋以从前；所恶于右，毋以交于左；所恶于左，毋以交于右：此之谓絜矩之道。\n《诗》云：「乐只君子，民之父母。」\n民之所好好之，民之所恶恶之，此之谓民之父母。\n《诗》云：「节彼南山，维石岩岩。赫赫师尹，民具尔瞻。」\n有国者不可以不慎，辟则为天下戮矣。\n《诗》云：「殷之未丧师，克配上帝。仪监于殷，峻命不易。」\n道得众则得国，失众则失国。\n是故君子先慎乎德。\n有德此有人，有人此有土，有土此有财，有财此有用。\n德者，本也；财者，末也。\n外本内末，争民施夺。\n是故财聚则民散，财散则民聚。\n是故言悖而出者，亦悖而入；货悖而入者，亦悖而出。\n《康诰》曰：「惟命不于常。」\n有命！\n《大甲》曰：「天作孽，犹可违；自作孽，不可逭。」\n此言善恶积累之大小。\n《秦誓》曰：「若有一个臣，断断兮无他技，休休焉其如有容焉。\n人之有技，若己有之；人之彦圣，其心好之，不啻若自其口出。\n寔能容之，以能保我子孙黎民，尚有利哉！\n人之有技，冒疾以恶之；人之彦圣，而违之俾不通。\n寔不能容，以不能保我子孙黎民，亦曰殆哉！」\n惟仁人放流之，迸诸四夷，不与同中国。\n此谓惟仁人为能爱人，能恶人。\n见贤而不能举，举而不能先，命也；见不善而不能退，退而不能远，过也。\n好人之所恶，恶人之所好，是谓拂人之性，灾必逮夫身。\n是故君子有大道，必忠信以得之，骄泰以失之。\n生财有大道，生之者众，食之者寡，为之者疾，用之者舒，则财恒足矣。\n仁者以财发身，不仁者以身发财。\n未有上好仁而下不好义者也，未有好义其事不终者也，未有府库财非其财者也。\n孟献子曰：「畜马乘不察于���豚，伐冰之家不畜牛羊，百乘之家不畜聚敛之臣。\n与其有聚敛之臣，宁有盗臣。」\n此谓国不以利为利，以义为利也。\n长国家而务财用者，必自小人矣。\n彼为善之，小人之使为国家，灾害并至。\n虽有善者，亦无如之何矣！\n此谓国不以利为利，以义为利。`
                },
                'daxue_jin': {
                    title: '大学（朱熹今本）',
                    content: `大学之道，在明明德，在亲民，在止于至善。\n知止而后有定，定而后能静，静而后能安，安而后能虑，虑而后能得。\n物有本末，事有终始，知所先后，则近道矣。\n古之欲明明德于天下者，先治其国；欲治其国者，先齐其家；欲齐其家者，先修其身；欲修其身者，先正其心；欲正其心者，先诚其意；欲诚其意者，先致其知。\n致知在格物。\n物格而后知至，知至而后意诚、意诚而后心正、心正而后身修、身修而后家齐、家齐而后国治、国治而后天下平。\n自天子以至于庶人，壹是皆以修身为本。\n其本乱而末治者，否矣。\n其所厚者薄，而其所薄者厚，未之有也。\n右经一章，三百二十字。\n所谓诚其意者，毋自欺也。\n如恶恶臭，如好好色，此之谓自谦。\n故君子必慎其独也。\n小人闲居为不善，无所不至。\n见君子而后厌然，掩其不善，而著其善。\n人之视己，如见其肺肝然，则何益矣。\n此谓诚于中，形于外。\n故君子必慎其独也。\n曾子曰：「十目所视，十手所指，其严乎！」\n富润屋，德润身，心广体胖，故君子必诚其意。\n《诗》云：「瞻彼淇澳，菉竹猗猗。有斐君子，如切如磋，如琢如磨。瑟兮侨兮，赫兮喧兮。有斐君子，终不可喧兮。」\n「如切如磋」者，道学也。\n「如琢如磨」者，自修也。\n「瑟兮侨兮」者，恂栗也。\n「赫兮喧兮」者，威仪也。\n「有斐君子，终不可喧兮」者，道盛德至善，民不能忘也。\n此谓诚于中，形于外。\n右传之六章，释诚意。\n《诗》云：「于戏前王不忘！」\n君子贤其贤而亲其亲，小人乐其乐而利其利，此以没世不忘也。\n右传之三章，释亲民。\n《康诰》曰：「克明德。」\n《大甲》曰：「顾諟天之明命。」\n《帝典》曰：「克明峻德。」\n皆自明也。\n右传之一章，释明明德。\n汤之《盘铭》曰：「苟日新，日日新，又日新。」\n《康诰》曰：「作新民。」\n《诗》曰：「周虽旧邦，其命惟新。」\n是故君子无所不用其极。\n右传之二章，释新民。\n《诗》云：「邦畿千里，惟民所止。」\n《诗》云：「缗蛮黄鸟，止于丘隅。」\n子曰：「于止，知其所止，可以人而不如鸟乎？」\n《诗》云：「穆穆文王，于缉熙敬止。」\n为人君，止于仁；为人臣，止于敬；为人子，止于孝；为人父，止于慈；与国人交，止于信。\n子曰：「听讼，吾犹人也。必也使无讼乎！」\n无情者，不得尽其辞。\n大畏民志，此谓知本。\n此谓知本。\n此谓知之至也。\n右传之四章，释止于至善。\n所谓修身在正其心者，身有所愤懑，则不得其正；有所恐惧，则不得其正；有所好乐，则不得其正；有所忧患，则不得其正。\n心不在焉，视而不见，听而不闻，食而不知其味。\n此谓修身在正其心。\n此谓身不修，不可以齐其家。\n右传之五章，释正心修身。\n所谓齐其家在修其身者，人之其所亲爱而辟焉，之其所贱恶而辟焉，之其所畏敬而辟焉，之其所哀矜而辟焉，之其所敖惰而辟焉。\n好人之所恶，恶人之所好，是谓拂人之性，灾必逮夫身。\n是故君子有诸己而后求诸人，无诸己而后非诸人。\n所藏乎身不恕，而能喻诸人者，未之有也。\n故治国在齐其家。\n《诗》云：「桃之夭夭，其叶蓁蓁。之子于归，宜其家人。」\n宜其家人，而后可以教国人。\n《诗》云：「宜尔室家，乐尔妻帑。」\n是故父子兄弟足法，而后民法之也。\n此谓身不修，不可以齐其家也。\n右传之六章，释齐家治国。\n所谓平天下在治其国者，上老老而民兴孝，上长长而民兴弟，上恤孤而民不倍。\n是以君子有絜矩之道也。\n所恶于上，毋以使下；所恶于下，毋以事上；所恶于前，毋以先后；所恶于后，毋以从前；所恶于右，毋以交于左；所恶于左，毋以交于右：此之谓絜矩之道。\n《诗》云：「乐只君子，民之父母。」\n民之所好好之，民之所恶恶之，此之谓民之父母。\n《诗》云：「节彼南山，维石岩岩。赫赫师尹，民具尔瞻。」\n有国者不可以不慎，辟则为天下戮矣。\n《诗》云：「殷之未丧师，克配上帝。仪监于殷，峻命不易。」\n道得众则得国，失众则失国。\n是故君子先慎乎德。\n有德此有人，有人此有土，有土此有财，有财此有用。\n德者，本也；财者，末也。\n外本内末，争民施夺。\n是故财聚则民散，财散则民聚。\n是故言悖而出者，亦悖而入；货悖而入者，亦悖而出。\n《康诰》曰：「惟命不于常。」\n有命！\n《大甲》曰：「天作孽，犹可违；自作孽，不可逭。」\n此言善恶积累之大小。\n《秦誓》曰：「若有一个臣，断断兮无他技，休休焉其如有容焉。\n人之有技，若己有之；人之彦圣，其心好之，不啻若自其口出。\n寔能容之，以能保我子孙黎民，尚有利哉！\n人之有技，冒疾以恶之；人之彦圣，而违之俾不通。\n寔不能容，以不能保我子孙黎民，亦曰殆哉！」\n惟仁人放流之，迸诸四夷，不与同中国。\n此谓惟仁人为能爱人，能恶人。\n见贤而不能举，举而不能先，命也；见不善而不能退，退而不能远，过也。\n好人之所恶，恶人之所好，是谓拂人之性，灾必逮夫身。\n是故君子有大道，必忠信以得之，骄泰以失之。\n生财有大道，生之者众，食之者寡，为之者疾，用之者舒，则财恒足矣。\n仁者以财发身，不仁者以身发财。\n未有上好仁而下不好义者也，未有好义其事不终者也，未有府库财非其财者也。\n孟献子曰：「畜马乘不察于鸡豚，伐冰之家不畜牛羊，百乘之家不畜聚敛之臣。\n与其有聚敛之臣，宁有盗臣。」\n此谓国不以利为利，以义为利也。\n长国家而务财用者，必自小人矣。\n彼为善之，小人之使为国家，灾害并至。\n虽有善者，亦无如之何矣！\n此谓国不以利为利，以义为利。\n右传之九章，释治国平天下。\n凡传十章，一章释明明德，二章释新民，三章释止于至善，四、五、六章释格物致知而复释诚意、正心、修身，七章释齐家，八章、九章释治国平天下。\n或问七章之释修身、齐家，皆不及于天下，何邪？曰：此修身之家也，正己而物正也。\n然则齐其家然后能治其国，与平天下者，何先后之序邪？\n曰：先治其国者，推其所以一家人者以治其国者也；平天下者，推其所以一国者以及天下者也。\n是则修身、齐家、治国、平天下，固一以贯之，而修身之于是也为首，此《大学》之大纲领也。\n而或者犹欲即其先后之序而详列之者，则于条目之间，亦将有略尽者耳，固不害于其贯通也。\n虽然，又尝缺所闻于师云：「此《大学》正义，宜在所省会也。\n及其成书，又将加注释于是篇之后云，故不此及云。`
                }
            };
            
            const classic = classicTexts[selectedValue];
            if (classic) {
                document.getElementById('classicTitle').textContent = classic.title;
                renderClassicText(classic.content);
                document.getElementById('classicContent').style.display = 'block';
            }
        }
        
        function renderClassicText(text) {
            currentClassicText = text;
            const container = document.getElementById('classicText');
            
            // 按换行分割成段落
            const paragraphs = text.split('\n');
            
            let html = '';
            
            for (let p = 0; p < paragraphs.length; p++) {
                const para = paragraphs[p];
                if (!para.trim()) continue;
                
                // 按逗号分割每段，按钮显示时保留标点
                const parts = para.split('，');
                
                for (let i = 0; i < parts.length; i++) {
                    let part = parts[i];
                    if (!part.trim()) continue;
                    
                    // 检查是否包含顿号，进一步分割
                    const dunhaoParts = part.split('、');
                    for (let j = 0; j < dunhaoParts.length; j++) {
                        let dp = dunhaoParts[j];
                        if (!dp.trim()) continue;
                        
                        if (j > 0) {
                            html += '、';
                        }
                        
                        // 为每个片段创建可点击span，移除末尾可能的句末标点用于匹配
                        const matchText = dp.replace(/[。？！；：]$/, '').trim();
                        if (matchText) {
                            html += `<span class="sentence-highlight" onclick="selectSentence('${matchText.replace(/'/g, "\\'")}')">${dp}</span>`;
                        } else if (dp) {
                            html += dp;
                        }
                    }
                    
                    // 在最后一个逗号段落后添加逗号
                    if (i < parts.length - 1) {
                        html += '，';
                    }
                }
                
                // 段落末尾添加换行
                if (p < paragraphs.length - 1) {
                    html += '<br><br>';
                }
            }
            
            container.innerHTML = html;
        }
        
        function selectSentence(sentence) {
            selectedSentence = sentence;
            
            // 清除之前的选中状态
            document.querySelectorAll('.sentence-highlight').forEach(el => {
                el.classList.remove('sentence-selected');
            });
            
            // 设置当前选中状态 - 找到匹配的句子
            const allSentences = document.querySelectorAll('.sentence-highlight');
            allSentences.forEach((el) => {
                const elText = el.textContent.replace(/[。？！；：]$/, '').trim();
                if (elText === sentence) {
                    el.classList.add('sentence-selected');
                }
            });
            
            // 更新左边栏
            document.getElementById('selectedSentenceText').textContent = sentence;
            document.getElementById('annotationInput').value = '';
            
            // 加载历史批注
            loadHistoricalAnnotations(sentence);
            
            // 检查是否启用自动检测
            const checkbox = document.getElementById('autoDetectCheckbox');
            if (checkbox && checkbox.checked) {
                runAutoAnalysisForSentence(sentence);
            }
        }
        
        function runAutoAnalysisForSentence(sentence) {
            // 将选中的句子设置为reviewContent，然后调用runAutoAnalysis
            document.getElementById('reviewContent').value = sentence;
            runAutoAnalysis();
        }
        
        function saveAnnotation() {
            const annotation = document.getElementById('annotationInput').value.trim();
            if (!annotation || !selectedSentence) {
                alert('请先选择句子并输入批注内容');
                return;
            }
            
            const annotations = JSON.parse(localStorage.getItem('classicAnnotations') || '{}');
            if (!annotations[selectedSentence]) {
                annotations[selectedSentence] = [];
            }
            
            annotations[selectedSentence].push({
                content: annotation,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            
            localStorage.setItem('classicAnnotations', JSON.stringify(annotations));
            
            // 清空输入框
            document.getElementById('annotationInput').value = '';
            
            // 重新加载历史批注
            loadHistoricalAnnotations(selectedSentence);
            
            alert('批注已保存');
        }
        
        function loadHistoricalAnnotations(sentence) {
            const annotations = JSON.parse(localStorage.getItem('classicAnnotations') || '{}');
            const sentenceAnnotations = annotations[sentence] || [];
            
            const container = document.getElementById('historicalAnnotations');
            
            if (sentenceAnnotations.length === 0) {
                container.innerHTML = '<p style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 10px;">暂无批注</p>';
                return;
            }
            
            container.innerHTML = sentenceAnnotations.map((ann, idx) => `
                <div class="annotation-item" style="position: relative;">
                    ${ann.content}
                    <div class="timestamp">${new Date(ann.timestamp).toLocaleString()}</div>
                    <button class="delete-btn" onclick="deleteAnnotation('${sentence.replace(/'/g, "\\'")}', ${idx})" title="删除批注">✕</button>
                </div>
            `).join('');
        }
        
        function deleteAnnotation(sentence, index) {
            if (!confirm('确定要删除这条批注吗？')) return;
            
            const annotations = JSON.parse(localStorage.getItem('classicAnnotations') || '{}');
            if (annotations[sentence]) {
                annotations[sentence].splice(index, 1);
                if (annotations[sentence].length === 0) {
                    delete annotations[sentence];
                }
                localStorage.setItem('classicAnnotations', JSON.stringify(annotations));
                loadHistoricalAnnotations(selectedSentence);
            }
        }
        
        function toggleFullscreenReading() {
            const fullscreenEl = document.getElementById('fullscreenReading');
            const title = document.getElementById('classicTitle').textContent;
            
            document.getElementById('fullscreenReadingTitle').textContent = title;
            renderFullscreenReadingContent(currentClassicText);
            
            fullscreenEl.classList.remove('hidden');
        }
        
        function renderFullscreenReadingContent(text) {
            const container = document.getElementById('fullscreenReadingContent');
            
            // 按句子分割文本
            const sentences = text.split(/[。！？\n]+/).filter(s => s.trim());
            
            let html = '';
            sentences.forEach((sentence) => {
                const trimmedSentence = sentence.trim();
                if (trimmedSentence) {
                    html += `<span class="sentence-highlight" onclick="selectSentence('${trimmedSentence.replace(/'/g, "\\'")}')" style="font-size: ${currentReadingFontSize}px;">${trimmedSentence}。</span><br><br>`;
                }
            });
            
            container.innerHTML = html;
        }
        
        function adjustReadingFontSize(delta) {
            currentReadingFontSize = Math.max(14, Math.min(24, currentReadingFontSize + delta));
            renderFullscreenReadingContent(currentClassicText);
        }
        
        function exitFullscreenReading() {
            document.getElementById('fullscreenReading').classList.add('hidden');
        }
        
        // 初始化经典阅读
        function initClassicReading() {
            // 加载已保存的批注数量统计
            const annotations = JSON.parse(localStorage.getItem('classicAnnotations') || '{}');
            const totalAnnotations = Object.keys(annotations).length;
            
            // 可以在这里添加更多初始化逻辑
            console.log(`经典阅读模块已初始化，已保存 ${totalAnnotations} 个句子的批注`);
        }
        
        // 页面加载时初始化
        document.addEventListener('DOMContentLoaded', function() {
            initClassicReading();
        });
