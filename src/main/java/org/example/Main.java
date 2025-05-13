package org.example;

import org.graalvm.polyglot.*;
import org.graalvm.polyglot.io.IOAccess;
import org.graalvm.polyglot.proxy.ProxyExecutable;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

public class Main {

    private static Map<String, String> getLanguageOptions() {
        Map<String, String> options = new HashMap<>();

        options.put("js.ecmascript-version", "2023");
        options.put("js.top-level-await", "true");
        options.put("js.webassembly", "true");
        options.put("js.commonjs-require", "true");
        options.put("js.mle-mode", "true");
        options.put("js.text-encoding", "true");
        options.put("js.esm-eval-returns-exports", "true");
        options.put("js.unhandled-rejections", "throw");
        options.put("js.commonjs-require-cwd", Paths.get("./src/main/resources").toAbsolutePath().toString());
        return options;
    }

    public static void main(String[] args) {

        try (Context context = Context.newBuilder("js", "wasm")
                .allowHostAccess(HostAccess.ALL)
                .allowAllAccess(true)
                .options(getLanguageOptions())
                .build()) {
            Document doc = Jsoup.connect("https://docs.python.org/3/library/math.html").get();

            Elements rows = doc.select("table.docutils tr"); // Select all rows from the constants/functions table

            List<Map<String, String>> texts = new ArrayList<>();
            int id = 1;

            for (Element row : rows) {
                Elements columns = row.select("td");
                if(texts.size()>47) break;

                if (columns.size() == 2) {
                    Element link = columns.get(0).selectFirst("a.reference.internal");
                    Element desc = columns.get(1).selectFirst("p");

                    if (link != null && desc != null) {
                        String title = link.text();
                        String url = "https://docs.python.org/3/library/math.html" + link.attr("href");
                        String text = desc.text();

                        Map<String, String> item = new HashMap<>();
                        item.put("id", String.valueOf(id++));
                        item.put("title", title);
                        item.put("url", url);
                        item.put("text", text);

                        texts.add(item);
                    }
                }
            }
            String query="factoriel calcul";//here you specify what you're looking for
            context.getBindings("js").putMember("scrappedData",texts);
            context.getBindings("js").putMember("queryy",query);
            byte[] wasmfile = Files.readAllBytes(Paths.get("./src/main/resources/voy_search_bg.wasm"));
            context.getBindings("js").putMember("wasmfile", wasmfile);

            context.eval(Source.newBuilder("js", Main.class.getResource("/voy.js"))
                    .mimeType("application/javascript+module")
                    .build());



        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
