#include <bits/stdc++.h>
#define maxn 103
#define ln 1000000003

using namespace std;

int n, x, y, MAXX = -ln, MAXY = -ln, MINX = ln, MINY = ln;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n;
    for(int i=1; i<=n; i++)
    {
        cin >> x >> y;
        MAXX = max(MAXX, x);
        MINX = min(MINX, x);
        MAXY = max(MAXY, y);
        MINY = min(MINY, y);
    }
    cout << max(MAXX - MINX, MAXY - MINY);
}
