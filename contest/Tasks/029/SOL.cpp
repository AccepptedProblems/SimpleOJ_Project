#include <bits/stdc++.h>
#define maxn 103
#define maxc 1000000003

using namespace std;

int n, a[maxn][maxn], m, k, ans = 0, Sum = 0, S;

int GET(int X1, int Y1, int X2, int Y2)
{
    return a[X2][Y2] - a[X1-1][Y2] - a[X2][Y1-1] + a[X1-1][Y1-1];
}

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n >> m >> S;
    for(int i=1; i<=n; i++)
        for(int j=1; j<=m; j++)
            cin >> a[i][j];
    for(int i=1; i<=n; i++)
        for(int j=1; j<=m; j++)
            a[i][j] = a[i-1][j] + a[i][j-1] - a[i-1][j-1] + a[i][j];
    double ans = -1e9;
    for(int i=1; i<=n; i++)
        for(int j=1; j<=m; j++)
            for(int x=i; x<=n; x++)
                for(int y=j; y<=m; y++)
                {
                    int Count = (x - i + 1) * (y - j + 1);
                    if( Count >= S )
                        ans = max(ans, 1.0 * GET(i, j, x, y) / Count);
                }
    printf("%0.2f", ans);
}
